using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents
{
    public class CommentWidget : ViewComponent
    {
        private CommentService CommentService { get; set; }

        public CommentWidget(CommentService commentService)
        {
            this.CommentService = commentService;
        }

        public async Task Invoke()
        {

        }
    }
}
