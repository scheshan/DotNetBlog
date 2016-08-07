using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc.Rendering;
using DotNetBlog.Core.Model.Setting;

namespace DotNetBlog.Web.TagHelpers
{
    [HtmlTargetElement("blog-title")]
    public class BlogTitleTagHelper : TagHelper
    {
        private SettingModel Setting { get; set; }

        public BlogTitleTagHelper(SettingModel setting)
        {
            Setting = setting;
        }

        [ViewContext]
        public ViewContext ViewContext { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "title";

            string title;

            string customTitle = ViewContext.ViewBag.Title as string;
            if (string.IsNullOrWhiteSpace(customTitle))
            {
                title = Setting.Title;
            }
            else
            {
                title = $"{customTitle} - {Setting.Title}";
            }

            output.Content.SetContent(title);
        }
    }
}
