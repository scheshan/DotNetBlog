using DotNetBlog.Core.Model.Page;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DotNetBlog.Web.TagHelpers
{
    [HtmlTargetElement("a", Attributes = "blog-page")]
    public class PageLinkTagHelper : TagHelper
    {
        [HtmlAttributeName("blog-page")]
        public PageBasicModel Page { get; set; }

        [HtmlAttributeName("blog-page-fragment")]
        public string Fragment { get; set; }

        /// <summary>
        /// Gets or sets the <see cref="Rendering.ViewContext"/> for the current request.
        /// </summary>
        [HtmlAttributeNotBound]
        [ViewContext]
        public ViewContext ViewContext { get; set; }

        private IUrlHelperFactory UrlHelperFactory { get; set; }

        public PageLinkTagHelper(IUrlHelperFactory urlHelperFactory)
        {
            this.UrlHelperFactory = urlHelperFactory;
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (Page == null)
            {
                base.Process(context, output);
            }
            else
            {
                var urlHelper = this.UrlHelperFactory.GetUrlHelper(this.ViewContext);

                string url;
                if (!string.IsNullOrWhiteSpace(this.Page.Alias))
                {
                    url = urlHelper.Action("PageByAlias", "Home", new { alias = this.Page.Alias });
                }
                else
                {
                    url = urlHelper.Action("Page", "Home", new { id = this.Page.ID });
                }

                if (!string.IsNullOrWhiteSpace(this.Fragment))
                {
                    url = string.Format("{0}#{1}", url, this.Fragment);
                }

                output.Attributes.Add("href", url);
                output.Attributes.Add("title", this.Page.Title);
            }
        }
    }
}
