using DotNetBlog.Core.Data;
using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Web.Controllers
{
    [Area("web")]
    [Route("")]
    public class HomeController : Controller
    {
        private TopicService TopicService { get; set; }

        public HomeController(TopicService topicService)
        {
            TopicService = topicService;
        }

        [Route("{page:int?}")]
        public async Task<IActionResult> Index(int page = 1)
        {
            var topicList = await TopicService.QueryNotTrash(page, 20, Core.Enums.TopicStatus.Published, null);

            return View(topicList);
        }
    }
}
