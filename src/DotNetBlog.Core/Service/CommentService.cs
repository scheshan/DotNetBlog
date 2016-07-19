using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DotNetBlog.Core.Model.Comment;

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

        public async Task<OperationResult<int>> Add(Comment comment)
        {
            var topic = await BlogContext.Topics.SingleOrDefaultAsync(t => t.ID == comment.TopicID);
            if (topic == null || topic.Status != Enums.TopicStatus.Published)
            {
                return OperationResult<int>.Failure("文章不存在");
            }
            if (!topic.AllowComment)
            {
                return OperationResult<int>.Failure("文章不允许评论");
            }

            if (comment.ReplyToID.HasValue)
            {
                if (!await BlogContext.Comments.AnyAsync(t => t.ID == comment.ReplyToID.Value && t.Status == Enums.CommentStatus.Approved))
                {
                    return OperationResult<int>.Failure("回复的评论不存在");
                }
            }

            comment.CreateDate = DateTime.Now;
            comment.UserID = this.ClientManager.CurrentUser?.ID;

            BlogContext.Comments.Add(comment);
            await BlogContext.SaveChangesAsync();

            return new OperationResult<int>(comment.ID);
        }

        public List<CommentModel> Transform(params Comment[] entityList)
        {
            return null;
        }
    }
}
