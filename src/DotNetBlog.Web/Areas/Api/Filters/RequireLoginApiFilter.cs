using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using Microsoft.AspNetCore.Mvc.Localization;

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
