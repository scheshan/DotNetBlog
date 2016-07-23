using DotNetBlog.Core.Model.Comment;
using DotNetBlog.Core.Model.Setting;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.ViewModels.Home;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    public class HomeController : Controller
    {
        private TopicService TopicService { get; set; }

        private CategoryService CategoryService { get; set; }

        private TagService TagService { get; set; }

        private CommentService CommentService { get; set; }

        private SettingModel SettingModel { get; set; }

        public HomeController(TopicService topicService, CategoryService categoryService, SettingModel settingModel, TagService tagService, CommentService commentService)
        {
            TopicService = topicService;
            CategoryService = categoryService;
            SettingModel = settingModel;
            TagService = tagService;
            CommentService = commentService;
        }

        [Route("{page:int?}")]
        public async Task<IActionResult> Index(int page = 1)
        {
            int pageSize = SettingModel.TopicsPerPage;

            var topicList = await TopicService.QueryNotTrash(page, pageSize, Core.Enums.TopicStatus.Published, null);

            var vm = new IndexPageViewModel
            {
                TopicList = new TopicListModel
                {
                    Data = topicList.Data,
                    PageIndex = page,
                    PageSize = pageSize,
                    Total = topicList.Total
                }
            };

            return View(vm);
        }

        [HttpGet("category/{id:int}/{page:int?}")]
        public async Task<IActionResult> Category(int id, int page = 1)
        {
            var category = (await CategoryService.All()).SingleOrDefault(t => t.ID == id);

            if (category == null)
            {
                return this.NotFound();
            }

            ViewBag.Title = $"分类:{category.Name}";

            int pageSize = SettingModel.TopicsPerPage;
            var topicList = await TopicService.QueryByCategory(page, pageSize, category.ID);

            var vm = new CategoryPageViewModel
            {
                Category = category,
                TopicList = new TopicListModel
                {
                    Data = topicList.Data,
                    PageIndex = page,
                    PageSize = pageSize,
                    Total = topicList.Total
                }
            };

            return View(vm);
        }

        [HttpGet("tag/{keyword}/{page:int?}")]
        public async Task<IActionResult> Tag(string keyword, int page = 1)
        {
            ViewBag.Title = $"标签:{keyword}";

            int pageSize = SettingModel.TopicsPerPage;

            var topicList = await TopicService.QueryByTag(page, pageSize, keyword);

            var vm = new TagPageViewModel
            {
                Tag = keyword,
                TopicList = new TopicListModel
                {
                    Data = topicList.Data,
                    PageIndex = page,
                    PageSize = pageSize,
                    Total = topicList.Total
                }
            };

            return View(vm);
        }

        [HttpGet("{year:int}-{month:int}/{page:int?}")]
        public async Task<IActionResult> Month(int year, int month, int page = 1)
        {
            ViewBag.Title = $"{year}年{month}月";

            int pageSize = SettingModel.TopicsPerPage;

            var topicList = await TopicService.QueryByMonth(page, pageSize, year, month);

            var vm = new MonthPageViewModel
            {
                Month = month,
                Year = year,
                TopicList = new TopicListModel
                {
                    Data = topicList.Data,
                    PageIndex = page,
                    PageSize = pageSize,
                    Total = topicList.Total
                }
            };

            return View(vm);
        }

        [HttpGet("topic/{id:int}")]
        public async Task<IActionResult> Topic(int id)
        {
            var topic = await TopicService.Get(id);

            if (topic == null)
            {
                return NotFound();
            }

            ViewBag.Title = topic.Title;

            var prevTopic = await TopicService.GetPrev(topic);
            var nextTopic = await TopicService.GetNext(topic);
            var relatedTopicList = await TopicService.QueryRelated(topic);

            var vm = new TopicPageViewModel
            {
                Topic = topic,
                PrevTopic = prevTopic,
                NextTopic = nextTopic,
                RelatedTopicList = relatedTopicList
            };

            return View(vm);
        }

        [HttpGet("view/{alias}")]
        public async Task<IActionResult> TopicByAlias(string alias)
        {
            return View();
        }

        [HttpPost("comment/add")]
        public async Task<IActionResult> AddComment([FromForm]AddCommentModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.BadRequest();
            }

            var result = await this.CommentService.Add(model);

            if (result.Success)
            {

            }
            else
            {
                return this.Content(result.ErrorMessage);
            }

            return this.RedirectToAction("Topic", "Home", new { id = result.Data.TopicID });
        }
    }
}
