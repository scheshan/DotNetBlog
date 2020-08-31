using DotNetBlog.Core.Model.Widget;
using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Widgets
{
    public class RecentCommentWidget : ViewComponent
    {
        private CommentService CommentService { get; set; }

        public RecentCommentWidget(CommentService commentService)
        {
            this.CommentService = commentService;
        }

        public async Task<IViewComponentResult> InvokeAsync(RecentCommentWidgetConfigModel config)
        {
            ViewBag.Config = config;

            var commentList = await this.CommentService.QueryLatest(config.Number);
            return View(commentList);
        }
    }
}
