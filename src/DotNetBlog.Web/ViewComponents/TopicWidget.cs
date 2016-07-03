using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents
{
    public class TopicWidget : ViewComponent
    {
        private TopicService TopicService { get; set; }

        public TopicWidget(TopicService topicService)
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
