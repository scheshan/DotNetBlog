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
                if (!await BlogContext.Comments.AnyAsync(t => t.ID == model.ReplyTo.Value && t.Status == Enums.CommentStatus.Approved))
                {
                    return OperationResult<CommentModel>.Failure("回复的评论不存在");
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
            var entityList = await BlogContext.Comments.Where(t => t.TopicID == topicID).Where(t => t.Status == Enums.CommentStatus.Approved).ToArrayAsync();

            return this.Transform(entityList);
        }

        public List<CommentModel> Transform(params Comment[] entityList)
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
    }
}
