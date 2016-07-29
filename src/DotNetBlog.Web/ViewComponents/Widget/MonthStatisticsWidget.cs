using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents.Widget
{
    public class MonthStatisticsWidget : ViewComponent
    {
        private TopicService TopicService { get; set; }

        public MonthStatisticsWidget(TopicService topicService)
        {
            TopicService = topicService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var list = await TopicService.QueryMonthStatistics();

            return View(list);
        }
    }
}
