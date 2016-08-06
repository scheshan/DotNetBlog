using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Api.Models.Comment;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Area("Api")]
    [Route("api/comment")]
    public class CommentController : ControllerBase
    {
        private CommentService CommentService { get; set; }

        public CommentController(CommentService commentService)
        {
            this.CommentService = commentService;
        }

        [HttpGet("query")]
        public async Task<IActionResult> Query([FromQuery]QueryCommentModel model)
        {
            var result = await this.CommentService.Query(model.PageIndex, model.PageSize, model.Status, model.Keywords);

            return this.PagedData(result.Data, result.Total);
        }

        [HttpPost("batch/approve")]
        public async Task<IActionResult> BatchApprove([FromBody]BatchModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.InvalidRequest();
            }

            await this.CommentService.BathUpdateStatus(model.CommentList, Core.Enums.CommentStatus.Approved);

            return this.Success();
        }

        [HttpPost("batch/reject")]
        public async Task<IActionResult> BatchReject([FromBody]BatchModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.InvalidRequest();
            }

            await this.CommentService.BathUpdateStatus(model.CommentList, Core.Enums.CommentStatus.Reject);

            return this.Success();
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody]BatchModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.InvalidRequest();
            }

            await this.CommentService.BatchDelete(model.CommentList);

            return this.Success();
        }

        [HttpPost("reply")]
        public async Task<IActionResult> Reply([FromBody]ReplyCommentModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.InvalidRequest();
            }

            var result = await this.CommentService.DirectlyReply(model.ReplyTo, model.Content);

            if (result.Success)
            {
                return this.Success();
            }
            else
            {
                return this.Error(result.ErrorMessage);
            }
        }

        [HttpGet("pending")]
        public async Task<IActionResult> QueryPending(int count)
        {
            if (count < 1)
            {
                return this.InvalidRequest();
            }

            var result = await this.CommentService.Query(1, count, Core.Enums.CommentStatus.Pending, null);

            return Success(result.Data);
        }
    }
}
