using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace DotNetBlog.Web.Areas.Api.Filters
{
    public class RequireLoginApiFilter : DotNetBlog.Web.Filters.RequireLoginFilter
    {
        protected override void HandleUnauthorizedRequest(ActionExecutingContext context)
        {
            var controller = context.Controller as Controllers.ControllerBase;
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            context.Result = controller.Error("请登录");
        }
    }
}
