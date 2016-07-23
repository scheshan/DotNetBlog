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
    }
}
