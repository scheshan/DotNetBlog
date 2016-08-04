using DotNetBlog.Core.Model.Widget;
using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Widgets
{
    public class PageWidget : ViewComponent
    {
        private PageService PageService { get; set; }

        public PageWidget(PageService pageService)
        {
            this.PageService = pageService;
        }

        public async Task<IViewComponentResult> InvokeAsync(PageWidgetConfigModel config)
        {
            ViewBag.Config = config;

            var pageList = await this.PageService.QueryPublished();
            return View(pageList);
        }
    }
}
