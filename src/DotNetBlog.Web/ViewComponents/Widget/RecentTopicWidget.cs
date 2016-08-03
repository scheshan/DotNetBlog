using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents.Widget
{
    public class RecentTopicWidget : ViewComponent
    {
        private TopicService TopicService { get; set; }

        public RecentTopicWidget(TopicService topicService)
        {
            TopicService = topicService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var topicList = await TopicService.QueryRecent(10);

            return View(topicList);
        }
    }
}
