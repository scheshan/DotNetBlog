using DotNetBlog.Core.Model.Setting;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

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
