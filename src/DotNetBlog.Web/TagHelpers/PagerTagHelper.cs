using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;

namespace DotNetBlog.Web.TagHelpers
{
    [HtmlTargetElement("pager")]
    public class PagerTagHelper : TagHelper
    {
        private IUrlHelperFactory UrlHelperFactory { get; set; }

        [HtmlAttributeName("page-index")]
        public int PageIndex { get; set; }

        [HtmlAttributeName("page-size")]
        public int PageSize { get; set; }

        [HtmlAttributeName("total")]
        public int Total { get; set; }

        private IDictionary<string, string> _routeValues;

        [HtmlAttributeName("all-route-data", DictionaryAttributePrefix = "route-")]
        public IDictionary<string, string> RouteValues
        {
            get
            {
                if (_routeValues == null)
                {
                    _routeValues = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                }
                return _routeValues;
            }
            set
            {
                _routeValues = value;
            }
        }

        /// <summary>
        /// Gets or sets the <see cref="Rendering.ViewContext"/> for the current request.
        /// </summary>
        [HtmlAttributeNotBound]
        [ViewContext]
        public ViewContext ViewContext { get; set; }

        public PagerTagHelper(IUrlHelperFactory urlHelperFactory)
        {
            this.UrlHelperFactory = urlHelperFactory;
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (this.Total < 0)
            {
                return;
            }

            var L = GetViewLocalizer();
            if (PageIndex <= 0 || PageSize <= 0)
            {
                this.SetErrorMessage(output, "错误的分页参数");
                return;
            }

            var totalPage = this.Total / this.PageSize;
            if (this.Total % this.PageSize > 0)
            {
                totalPage++;
            }

            if (this.PageIndex > totalPage)
            {
                return;
            }

            var start = this.PageIndex - 4;
            if (start <= 0)
            {
                start = 1;
            }

            var end = start + 7;
            if (end > totalPage)
            {
                end = totalPage;
            }

            output.TagName = "ul";
            output.Attributes.Add("id", "PostPager");
            output.TagMode = TagMode.StartTagAndEndTag;

            StringBuilder sb = new StringBuilder();

            if (this.PageIndex > 1)
            {
                sb.Append($"<li>{this.GetPageLink(this.PageIndex - 1, "之后的文章")}</li>");
            }
            else
            {
                sb.Append($"<li class='PagerLinkDisabled'>之后的文章</li>");
            }
            for (var i = start; i <= end; i++)
            {
                if (this.PageIndex == i)
                {
                    sb.Append($"<li class='PagerLinkCurrent'>{i}</li>");
                }
                else
                {
                    sb.Append($"<li class='PagerLink'>{this.GetPageLink(i, i.ToString())}</li>");
                }
            }
            if (this.PageIndex < totalPage)
            {
                sb.Append($"<li>{this.GetPageLink(this.PageIndex + 1, "之前的文章")}</li>");
            }
            else
            {
                sb.Append($"<li class='PagerLinkDisabled'>之前的文章</li>");
            }

            output.Content.SetHtmlContent(sb.ToString());
        }

        private void SetErrorMessage(TagHelperOutput output, string message)
        {
            output.TagName = "div";
            output.Content.SetContent(message);
        }

        private string GetPageLink(int page, string text)
        {
            var routes = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);

            if (this.ViewContext.RouteData.Values.Count > 0)
            {
                foreach (var value in this.ViewContext.RouteData.Values)
                {
                    routes[value.Key] = value.Value;
                }
            }
            if (this.RouteValues.Count > 0)
            {
                foreach (var value in this.RouteValues)
                {
                    routes[value.Key] = value.Value;
                }
            }

            routes["Page"] = page;

            string action = ViewContext.ActionDescriptor.RouteValues["action"];
            if (routes["Action"] != null)
            {
                action = routes["Action"].ToString();
            }

            string controller = ViewContext.ActionDescriptor.RouteValues["controller"];
            if (routes["Controller"] != null)
            {
                controller = routes["Controller"].ToString();
            }

            var urlHelper = this.UrlHelperFactory.GetUrlHelper(this.ViewContext);
            string url = urlHelper.Action(action, controller, routes);

            return $"<a href=\"{url}\">{text}</a>";
        }

        private IHtmlLocalizer GetViewLocalizer() 
        {
            var localizer = ViewContext.HttpContext.RequestServices.GetService(typeof(IViewLocalizer)) as IViewLocalizer;
            (localizer as IViewContextAware)?.Contextualize(ViewContext);
            return localizer;
        }
    }
}
