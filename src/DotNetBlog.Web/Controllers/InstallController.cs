using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Enums;
using DotNetBlog.Core.Model.Widget;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    public class InstallController : Controller
    {
        private BlogContext BlogContext { get; set; }

        public InstallController(BlogContext blogContext)
        {
            this.BlogContext = blogContext;
        }

        [HttpGet("install")]
        public async Task<IActionResult> Index()
        {
            if (await this.BlogContext.Database.EnsureCreatedAsync())
            {
                var user = new User
                {
                    UserName = "admin",
                    Password = Core.Utilities.EncryptHelper.MD5("admin"),
                    Nickname = "系统管理员",
                    Email = "admin@dotnetblog.com"
                };

                this.BlogContext.Users.Add(user);

                var widgetList = new List<WidgetModel>();
                widgetList.Add(new WidgetModel
                {
                    Type = WidgetType.Administration,
                    Config = new AdministrationWidgetConfigModel()
                });
                widgetList.Add(new WidgetModel
                {
                    Type = WidgetType.Search,
                    Config = new SearchWidgetConfigModel()
                });
                widgetList.Add(new WidgetModel
                {
                    Type = WidgetType.Category,
                    Config = new CategoryWidgetConfigModel()
                });
                widgetList.Add(new WidgetModel
                {
                    Type = WidgetType.Tag,
                    Config = new TagWidgetConfigModel()
                });
                widgetList.Add(new WidgetModel
                {
                    Type = WidgetType.MonthStatistics,
                    Config = new MonthStatisticeWidgetConfigModel()
                });
                widgetList.Add(new WidgetModel
                {
                    Type = WidgetType.RecentTopic,
                    Config = new RecentTopicWidgetConfigModel()
                });
                widgetList.Add(new WidgetModel
                {
                    Type = WidgetType.RecentComment,
                    Config = new RecentCommentWidgetConfigModel()
                });
                widgetList.Add(new WidgetModel
                {
                    Type = WidgetType.Page,
                    Config = new PageWidgetConfigModel()
                });

                var widgetEntityList = widgetList.Select(t => new Widget
                {
                    Config = JsonConvert.SerializeObject(t.Config),
                    Type = t.Type,
                    ID = widgetList.IndexOf(t) + 1
                });
                this.BlogContext.AddRange(widgetEntityList);

                await this.BlogContext.SaveChangesAsync();
            }

            return RedirectToAction("Index", "Home");
        }
    }
}
