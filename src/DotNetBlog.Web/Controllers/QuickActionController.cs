using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    [Filters.ErrorHandleFilter]
    [Filters.RequireLoginFilter]
    public class QuickActionController : Controller
    {
        private CommentService CommentService { get; set; }

        private TopicService TopicService { get; set; }

        public QuickActionController(CommentService commentService, TopicService topicService)
        {
            this.CommentService = commentService;
            this.TopicService = topicService;
        }

        [HttpGet("comment/delete")]
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

        [HttpGet("topic/{topicID:int}/delete")]
        public async Task<IActionResult> DeleteTopic(int topicID)
        {
            await this.TopicService.BatchUpdateStatus(new int[] { topicID }, Core.Enums.TopicStatus.Trash);

            return this.RedirectToAction("Index", "Home");
        }
    }
}
