using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Widgets
{
    public class RecentTopicWidget : ViewComponent
    {
        private TopicService TopicService { get; set; }

        public RecentTopicWidget(TopicService topicService)
        {
            TopicService = topicService;
        }

        public async Task<IViewComponentResult> InvokeAsync(Core.Model.Widget.RecentTopicWidgetConfigModel config)
        {
            ViewBag.Config = config;

            var topicList = await TopicService.QueryRecent(config.Number, config.Category);

            return View(topicList);
        }
    }
}
