using DotNetBlog.Core.Model.Topic;
using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents
{
    public class TopicList : ViewComponent
    {
        private ConfigService ConfigService { get; set; }

        public TopicList(ConfigService configService)
        {
            ConfigService = configService;
        }

        public async Task<IViewComponentResult> InvokeAsync(List<TopicModel> topicList)
        {
            ViewBag.Config = await ConfigService.Get();

            return this.View(topicList);
        }
    }
}
