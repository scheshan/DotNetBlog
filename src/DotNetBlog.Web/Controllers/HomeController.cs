using DotNetBlog.Core.Model.Comment;
using DotNetBlog.Core.Model.Page;
using DotNetBlog.Core.Model.Setting;
using DotNetBlog.Core.Model.Topic;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.ViewModels.Home;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using DotNetBlog.Core;

namespace DotNetBlog.Web.Controllers
{
    [Filters.ErrorHandleFilter]
    public class HomeController : Controller
    {
        private static readonly string Cookie_CommentName = "DotNetBlog_CommentName";

        private static readonly string Cookie_CommentEmail = "DotNetBlog_CommentEmail";

        private TopicService TopicService { get; set; }

        private CategoryService CategoryService { get; set; }

        private TagService TagService { get; set; }

        private CommentService CommentService { get; set; }

        private PageService PageService { get; set; }

        private SettingModel SettingModel { get; set; }

        private ClientManager ClientManager { get; set; }

        public HomeController(
            TopicService topicService, 
            CategoryService categoryService, 
            SettingModel settingModel, 
            TagService tagService, 
            CommentService commentService, 
            PageService pageService,
            ClientManager clientManager)
        {
            TopicService = topicService;
            CategoryService = categoryService;
            SettingModel = settingModel;
            TagService = tagService;
            CommentService = commentService;
            PageService = pageService;
            ClientManager = clientManager;
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

            return await this.TopicView(topic);
        }

        [HttpGet("topic/{alias}")]
        public async Task<IActionResult> TopicByAlias(string alias)
        {
            var topic = await TopicService.Get(alias);

            return await this.TopicView(topic);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string keywords, int page = 1)
        {
            SearchPageViewModel vm = new SearchPageViewModel
            {
                Keywords = keywords,
                TopicList = new TopicListModel
                {
                    Data = new List<TopicModel>()
                }
            };

            int pageSize = 10;

            ViewBag.Title = $"搜索结果:{keywords}";

            if (!string.IsNullOrWhiteSpace(keywords))
            {
                var topicList = await TopicService.QueryByKeywords(page, pageSize, keywords);

                vm.TopicList = new TopicListModel
                {
                    Data = topicList.Data,
                    PageIndex = page,
                    PageSize = pageSize,
                    Total = topicList.Total
                };
            }

            return this.View(vm);
        }

        [HttpGet("page/{id:int}")]
        public async Task<IActionResult> Page(int id)
        {
            var page = await this.PageService.Get(id);

            return this.PageView(page);
        }

        [HttpGet("page/{alias}")]
        public async Task<IActionResult> PageByAlias(string alias)
        {
            var page = await this.PageService.Get(alias);

            return this.PageView(page);
        }

        [NonAction]
        private async Task<IActionResult> TopicView(TopicModel topic)
        {
            if (topic == null)
            {
                return NotFound();
            }
            if (topic.Status != Core.Enums.TopicStatus.Published && !this.ClientManager.IsLogin)
            {
                return NotFound();
            }

            ViewBag.Title = topic.Title;

            var prevTopic = await TopicService.GetPrev(topic);
            var nextTopic = await TopicService.GetNext(topic);
            var relatedTopicList = await TopicService.QueryRelated(topic);
            var commentList = await CommentService.QueryByTopic(topic.ID);

            var vm = new TopicPageViewModel
            {
                AllowComment = this.TopicService.CanComment(topic),
                Topic = topic,
                PrevTopic = prevTopic,
                NextTopic = nextTopic,
                RelatedTopicList = relatedTopicList,
                CommentList = commentList,
                CommentForm = new CommentFormModel()
            };

            vm.CommentForm.Name = Request.Cookies[Cookie_CommentName];
            vm.CommentForm.Email = Request.Cookies[Cookie_CommentEmail];

            return View("Topic", vm);
        }

        [NonAction]
        private IActionResult PageView(PageModel page)
        {
            if (page == null)
            {
                return NotFound();
            }
            if (page.Status != Core.Enums.PageStatus.Published && !this.ClientManager.IsLogin)
            {
                return NotFound();
            }

            ViewBag.Title = page.Title;

            return View("Page", page);
        }

        [HttpPost("comment/add")]
        public async Task<IActionResult> AddComment([FromForm]AddCommentModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.Notice(new NoticePageViewModel
                {
                    Message = "错误的请求,请稍后再试",
                    RedirectUrl = Url.Action("Topic", "Home", new { id = model.TopicID }),
                    MessageType = NoticePageViewModel.NoticeMessageType.Error
                });
            }

            var result = await this.CommentService.Add(model);

            this.Response.Cookies.Append(Cookie_CommentName, model.Name);
            this.Response.Cookies.Append(Cookie_CommentEmail, model.Email);

            if (result.Success)
            {
                if (result.Data.Status != Core.Enums.CommentStatus.Approved)
                {
                    return this.Notice(new NoticePageViewModel
                    {
                        Message = "您的评论已经添加成功,需要管理员审核通过后才能显示",
                        RedirectUrl = Url.Action("Topic", "Home", new { id = model.TopicID }),
                        MessageType = NoticePageViewModel.NoticeMessageType.Success
                    });
                }
            }
            else
            {
                return this.Notice(new NoticePageViewModel
                {
                    Message = result.ErrorMessage,
                    RedirectUrl = Url.Action("Topic", "Home", new { id = model.TopicID }),
                    MessageType = NoticePageViewModel.NoticeMessageType.Error
                });
            }

            return this.RedirectToAction("Topic", "Home", new { id = result.Data.TopicID });
        }

        [NonAction]
        private IActionResult Notice(NoticePageViewModel vm)
        {
            return this.View("Notice", vm);
        }
    }
}
