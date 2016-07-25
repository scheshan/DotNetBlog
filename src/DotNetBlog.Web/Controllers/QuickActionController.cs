using DotNetBlog.Core.Model.Comment;
using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    [Filters.RequireLoginFilter]
    public class QuickActionController : Controller
    {
        private CommentService CommentService { get; set; }

        public QuickActionController(CommentService commentService)
        {
            this.CommentService = commentService;
        }

        [HttpPost("comment/add")]
        public async Task<IActionResult> AddComment([FromForm]AddCommentModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.BadRequest();
            }

            var result = await this.CommentService.Add(model);

            if (result.Success)
            {

            }
            else
            {
                return this.Content(result.ErrorMessage);
            }

            return this.RedirectToAction("Topic", "Home", new { id = result.Data.TopicID });
        }

        [HttpGet("comment/delete")]
        [Filters.RequireLoginFilter]
        public async Task<IActionResult> DeleteComment(int id, bool deleteChild)
        {
            var commentModel = await this.CommentService.Delete(id, deleteChild);
            if (commentModel == null)
            {
                return this.NotFound();
            }

            return this.RedirectToAction("Topic", "Home", new { id = commentModel.TopicID });
        }

        [HttpGet("topic/{topicID:int}/approvecomments")]
        public async Task<IActionResult> ApproveComments(int topicID)
        {
            await this.CommentService.ApprovePendingComments(topicID);

            return this.RedirectToAction("Topic", "Home", new { id = topicID });
        }

        [HttpGet("comment/{commentID:int}/approve")]
        public async Task<IActionResult> ApproveComment(int commentID)
        {
            var comment = await this.CommentService.ApproveComment(commentID);

            if (comment == null)
            {
                return NotFound();
            }

            return this.RedirectToAction("Topic", "Home", new { id = comment.TopicID });
        }
    }
}
