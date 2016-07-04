using DotNetBlog.Core.Model.Setting;
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
        private SettingModel SettingModel { get; set; }

        public TopicList(SettingModel settingModel)
        {
            SettingModel = settingModel;
        }

        public IViewComponentResult Invoke(List<TopicModel> topicList)
        {
            ViewBag.Config = SettingModel;

            return this.View(topicList);
        }
    }
}
