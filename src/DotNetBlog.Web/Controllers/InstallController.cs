using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Enums;
using DotNetBlog.Core.Model.Widget;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    public class InstallController : Controller
    {
        private BlogContext BlogContext { get; set; }

        private static ILogger Logger = LogManager.GetCurrentClassLogger();

        private IHtmlLocalizer<InstallController> L { get; set; }

        private IHtmlLocalizer<WidgetConfigModelBase> WidgetLocalizer { get; set; }

        public InstallController(BlogContext blogContext, 
            IHtmlLocalizer<InstallController> localizer,
            IHtmlLocalizer<WidgetConfigModelBase> widgetLocalizer)
        {
            this.BlogContext = blogContext;
            this.L = localizer;
            this.WidgetLocalizer = WidgetLocalizer;
        }

        [HttpGet("install")]
        public async Task<IActionResult> Index()
        {
            try
            {
                if (await this.BlogContext.Database.EnsureCreatedAsync())
                {
                    var user = new User
                    {
                        UserName = "admin",
                        Password = Core.Utilities.EncryptHelper.MD5("admin"),
                        Nickname = L["System Administrator"].Value,
                        Email = "admin@dotnetblog.com"
                    };

                    this.BlogContext.Users.Add(user);

                    var widgetList = new List<WidgetModel>();
                    widgetList.Add(new WidgetModel
                    {
                        Type = WidgetType.Administration,
                        Config = new AdministrationWidgetConfigModel(WidgetLocalizer)
                    });
                    widgetList.Add(new WidgetModel
                    {
                        Type = WidgetType.Search,
                        Config = new SearchWidgetConfigModel(WidgetLocalizer)
                    });
                    widgetList.Add(new WidgetModel
                    {
                        Type = WidgetType.Category,
                        Config = new CategoryWidgetConfigModel(WidgetLocalizer)
                    });
                    widgetList.Add(new WidgetModel
                    {
                        Type = WidgetType.Tag,
                        Config = new TagWidgetConfigModel(WidgetLocalizer)
                    });
                    widgetList.Add(new WidgetModel
                    {
                        Type = WidgetType.MonthStatistics,
                        Config = new MonthStatisticeWidgetConfigModel(WidgetLocalizer)
                    });
                    widgetList.Add(new WidgetModel
                    {
                        Type = WidgetType.RecentTopic,
                        Config = new RecentTopicWidgetConfigModel(WidgetLocalizer)
                    });
                    widgetList.Add(new WidgetModel
                    {
                        Type = WidgetType.RecentComment,
                        Config = new RecentCommentWidgetConfigModel(WidgetLocalizer)
                    });
                    widgetList.Add(new WidgetModel
                    {
                        Type = WidgetType.Page,
                        Config = new PageWidgetConfigModel(WidgetLocalizer)
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
            catch(Exception ex)
            {
                Logger.Error(ex, ex.Message);
                return this.Content(ex.Message);
            }
        }
    }
}
