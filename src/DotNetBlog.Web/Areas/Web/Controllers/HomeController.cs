using DotNetBlog.Core.Data;
using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Topic;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Web.ViewModels.Home;
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

        private CategoryService CategoryService { get; set; }

        private ConfigService ConfigService { get; set; }

        private TagService TagService { get; set; }

        public HomeController(TopicService topicService, CategoryService categoryService, ConfigService configService, TagService tagService)
        {
            TopicService = topicService;
            CategoryService = categoryService;
            ConfigService = configService;
            TagService = tagService;
        }

        [Route("{page:int?}")]
        public async Task<IActionResult> Index(int page = 1)
        {
            int pageSize = (await ConfigService.Get()).TopicsPerPage;

            var topicList = await TopicService.QueryNotTrash(page, pageSize, Core.Enums.TopicStatus.Published, null);

            //var topicList = new PagedResult<TopicModel>(new List<TopicModel>(), 0);

            return View(topicList);
        }

        [HttpGet("category/{id:int}/{page:int?}")]
        public async Task<IActionResult> Category(int id, int page = 1)
        {
            var category = (await CategoryService.All()).SingleOrDefault(t => t.ID == id);

            if (category == null)
            {
                return this.NotFound();
            }

            int pageSize = (await ConfigService.Get()).TopicsPerPage;

            var vm = new CategoryViewModel();
            vm.Category = category;
            vm.TopicList = await TopicService.QueryByCategory(page, pageSize, id);

            return View(vm);
        }

        [HttpGet("tag/{keyword}/{page:int?}")]
        public async Task<IActionResult> Tag(string keyword, int page = 1)
        {
            int pageSize = (await ConfigService.Get()).TopicsPerPage;

            var topicList = await TopicService.QueryByTag(page, pageSize, keyword);

            return View(topicList);
        }
    }
}
