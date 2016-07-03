using DotNetBlog.Core.Model.Topic;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.TagHelpers
{
    [HtmlTargetElement("render-topic-summary")]
    public class RenderTopicSummaryTagHelper : TagHelper
    {
        [HtmlAttributeName("topic")]
        public TopicModel Topic { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "";

            if(!string.IsNullOrWhiteSpace(Topic.Summary))
            {
                output.Content.Append(Topic.Summary);
            }
            else
            {
                output.Content.AppendHtml(Topic.Content);
            }
        }
    }
}
