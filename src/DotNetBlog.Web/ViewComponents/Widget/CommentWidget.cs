using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents.Widget
{
    public class CommentWidget : ViewComponent
    {
        private CommentService CommentService { get; set; }

        public CommentWidget(CommentService commentService)
        {
            this.CommentService = commentService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var commentList = await this.CommentService.QueryLatest(10);
            return View(commentList);
        }
    }
}
