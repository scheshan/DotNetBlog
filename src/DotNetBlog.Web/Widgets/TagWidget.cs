using DotNetBlog.Core.Model.Widget;
using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Widgets
{
    public class TagWidget : ViewComponent
    {
        private TagService TagService { get; set; }

        public TagWidget(TagService tagService)
        {
            TagService = tagService;
        }

        public async Task<IViewComponentResult> InvokeAsync(TagWidgetConfigModel config)
        {
            ViewBag.Config = config;

            var query = (await TagService.All()).AsQueryable();
            var tagList = query.Where(t => t.Topics.Published >= config.MinTopicNumber)
                .OrderByDescending(t => t.Topics.Published)
                .Take(config.Number)
                .ToList();

            return View(tagList);
        }
    }
}
