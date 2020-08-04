using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents
{
    public class PageListNav : ViewComponent
    {
        private PageService PageService { get; set; }

        public PageListNav(PageService pageService)
        {
            this.PageService = pageService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var pageList = await this.PageService.QueryPublished();
            return this.View(pageList);
        }
    }
}
