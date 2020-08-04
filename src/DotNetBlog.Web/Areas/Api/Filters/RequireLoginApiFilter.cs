using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.DependencyInjection;
using System.Net;

namespace DotNetBlog.Web.Areas.Api.Filters
{
    public class RequireLoginApiFilter : DotNetBlog.Web.Filters.RequireLoginFilter
    {
        protected override void HandleUnauthorizedRequest(ActionExecutingContext context)
        {
            var L = context.HttpContext.RequestServices.GetService<IHtmlLocalizer<RequireLoginApiFilter>>();
            var controller = context.Controller as Controllers.ControllerBase;
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            context.Result = controller.Error(L["Please sign in"].Value);
        }
    }
}
