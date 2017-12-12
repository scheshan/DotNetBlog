using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace DotNetBlog.Web.TagHelpers
{
    // You may need to install the Microsoft.AspNetCore.Razor.Runtime package into your project
    [HtmlTargetElement("markdown")]
    public class MarkdownTagHelper : TagHelper
    {
        [HtmlAttributeName("content")]
        public string Content { get; set; }

        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            string content = null;

            if (this.Content != null)
            {
                content = this.Content;
            }
            else
            {
                content = (await output.GetChildContentAsync()).GetContent();
            }

            output.TagName = "";

            string html = content.FromMarkdown();

            output.Content.SetHtmlContent(html);
        }
    }
}
