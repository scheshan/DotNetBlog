using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DotNetBlog.Core.Model.Comment;
using DotNetBlog.Core.Extensions;

namespace DotNetBlog.Core.Service
{
    public class CommentService
    {
        private BlogContext BlogContext { get; set; }

        private ClientManager ClientManager { get; set; }

        public CommentService(BlogContext blogContext, ClientManager clientManager)
        {
            this.BlogContext = blogContext;
            this.ClientManager = clientManager;
        }

        public async Task<OperationResult<CommentModel>> Add(AddCommentModel model)
        {
            var topic = await BlogContext.Topics.SingleOrDefaultAsync(t => t.ID == model.TopicID);
            if (topic == null || topic.Status != Enums.TopicStatus.Published)
            {
                return OperationResult<CommentModel>.Failure("文章不存在");
            }
            if (!topic.AllowComment)
            {
                return OperationResult<CommentModel>.Failure("文章不允许评论");
            }

            if (model.ReplyTo.HasValue)
            {
                var replyEntity = await BlogContext.Comments.SingleOrDefaultAsync(t => t.ID == model.ReplyTo.Value);

                if (replyEntity == null || replyEntity.Status != Enums.CommentStatus.Approved)
                {
                    return OperationResult<CommentModel>.Failure("回复的评论不存在");
                }

                if (replyEntity.TopicID != model.TopicID)
                {
                    return OperationResult<CommentModel>.Failure("错误的回复对象");
                }
            }

            var entity = new Comment
            {
                Content = model.Content,
                CreateDate = DateTime.Now,
                CreateIP = this.ClientManager.ClientIP,
                Email = model.Email,
                Name = model.Name,
                NotifyOnComment = model.NotifyOnComment,
                ReplyToID = model.ReplyTo,
                TopicID = model.TopicID.Value,
                Status = Enums.CommentStatus.Pending,
                UserID = this.ClientManager.CurrentUser?.ID,
                WebSite = model.WebSite
            };

            BlogContext.Comments.Add(entity);
            await BlogContext.SaveChangesAsync();

            var commentModel = Transform(entity).First();

            return new OperationResult<CommentModel>(commentModel);
        }

        public async Task<List<CommentModel>> QueryByTopic(int topicID)
        {
            var entityList = await BlogContext.Comments.Where(t => t.TopicID == topicID && t.Status != Enums.CommentStatus.Junk).ToArrayAsync();

            return this.Transform(entityList);
        }

        public async Task<PagedResult<CommentModel>> Query(int pageIndex, int pageSize, Enums.CommentStatus? status, string keywords)
        {
            var query = this.BlogContext.Comments.AsQueryable();
            if (status.HasValue)
            {
                query = query.Where(t => t.Status == status.Value);
            }
            if (!string.IsNullOrWhiteSpace(keywords))
            {
                query = query.Where(t => t.Name.Contains(keywords) || t.Content.Contains(keywords) || t.WebSite.Contains(keywords) || t.Email.Contains(keywords));
            }

            int total = await query.CountAsync();

            query = query.OrderByDescending(t => t.ID)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize);

            var entityList = await query.ToArrayAsync();

            var modelList = this.Transform(entityList);

            return new PagedResult<CommentModel>(modelList, total);
        }

        public async Task BathUpdateStatus(int[] idList, Enums.CommentStatus status)
        {
            var entityList = await this.BlogContext.Comments.Where(t => idList.Contains(t.ID)).ToListAsync();
            foreach (var entity in entityList)
            {
                entity.Status = status;
            }

            await this.BlogContext.SaveChangesAsync();
        }

        public async Task BatchDelete(int[] idList)
        {
            int?[] deleteIDList = idList.Cast<int?>().ToArray();

            using (var tran = this.BlogContext.Database.BeginTransaction())
            {
                var entityList = await this.BlogContext.Comments.Where(t => deleteIDList.Contains(t.ID)).ToListAsync();
                this.BlogContext.RemoveRange(entityList);
                await this.BlogContext.SaveChangesAsync();

                var childReplyList = await this.BlogContext.Comments.Where(t => deleteIDList.Contains(t.ReplyToID)).ToListAsync();
                foreach (var entity in childReplyList)
                {
                    entity.ReplyToID = null;
                }
                await this.BlogContext.SaveChangesAsync();

                tran.Commit();
            }
        }

        public async Task<CommentModel> Delete(int id, bool deleteChild)
        {
            var entity = await this.BlogContext.Comments.SingleOrDefaultAsync(t => t.ID == id);
            if (entity == null)
            {
                return null;
            }

            var result = this.Transform(entity).First();

            this.BlogContext.Comments.Remove(entity);

            if (deleteChild)
            {
                var allCommentList = await this.BlogContext.Comments.Where(t => t.TopicID == entity.TopicID).ToListAsync();
                var idList = this.GetChildCommentIDList(allCommentList, entity.ID);

                var deleteEntityList = allCommentList.Where(t => idList.Contains(t.ID)).ToList();
                this.BlogContext.Comments.RemoveRange(deleteEntityList);
            }
            else
            {
                var replyEntityList = await this.BlogContext.Comments.Where(t => t.ReplyToID == entity.ID).ToListAsync();
                foreach (var replyEntity in replyEntityList)
                {
                    replyEntity.ReplyToID = null;
                }
            }

            await this.BlogContext.SaveChangesAsync();

            return result;
        }

        public async Task ApprovePendingComments(int topicID)
        {
            var entityList = await this.BlogContext.Comments.Where(t => t.TopicID == topicID && t.Status == Enums.CommentStatus.Pending).ToListAsync();

            foreach (var entity in entityList)
            {
                entity.Status = Enums.CommentStatus.Approved;
            }

            await this.BlogContext.SaveChangesAsync();
        }

        private List<CommentModel> Transform(params Comment[] entityList)
        {
            var userIDList = entityList.Where(t => t.UserID.HasValue).Select(t => t.UserID.Value).ToList();
            var userList = this.BlogContext.QueryUserFromCache().Where(t => userIDList.Contains(t.ID)).ToList();

            var result = from comment in entityList
                         join user in userList on comment.UserID equals user.ID
                         select new CommentModel
                         {
                             Content = comment.Content,
                             CreateDate = comment.CreateDate,
                             CreateIP = comment.CreateIP,
                             Email = comment.Email,
                             ID = comment.ID,
                             Name = comment.Name,
                             ReplyToID = comment.ReplyToID,
                             Status = comment.Status,
                             TopicID = comment.TopicID,
                             WebSite = comment.WebSite,
                             User = user != null ? new CommentModel.UserModel
                             {
                                 Nickname = user.Nickname,
                                 Email = user.Email,
                                 ID = user.ID,
                                 UserName = user.UserName
                             } : null
                         };

            return result.ToList();
        }

        private List<int> GetChildCommentIDList(List<Comment> entityList, int parent)
        {
            List<int> result = new List<int>();
            result.Add(parent);

            var children = entityList.Where(t => t.ReplyToID == parent).ToList();
            foreach (var child in children)
            {
                result.AddRange(this.GetChildCommentIDList(entityList, child.ID));
            }

            return result;
        }
    }
}
