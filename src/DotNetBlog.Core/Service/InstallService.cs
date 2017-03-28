using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Model.Widget;
using Microsoft.AspNetCore.Mvc.Localization;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using DotNetBlog.Core.Enums;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class InstallService
    {

        private BlogContext BlogContext { get; set; }

        private IHtmlLocalizer<WidgetConfigModelBase> WidgetLocalizer { get; set; }

        public InstallService(BlogContext BlogContext, IHtmlLocalizer<WidgetConfigModelBase> widgetLocalizer)
        {
            this.BlogContext = BlogContext;
            this.WidgetLocalizer = widgetLocalizer;
        }

        public async Task Install(string username, string password, string nickname, string email)
        {
            if (await this.BlogContext.Database.EnsureCreatedAsync())
            {
                var user = new User
                {
                    UserName = username,
                    Password = Core.Utilities.EncryptHelper.MD5(password),
                    Nickname = nickname,
                    Email = email
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
        }

    }
}
