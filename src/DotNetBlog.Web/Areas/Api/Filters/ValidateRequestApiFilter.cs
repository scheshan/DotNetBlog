using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;

namespace DotNetBlog.Web.Areas.Api.Filters
{
    public class ValidateRequestApiFilter : DotNetBlog.Web.Filters.ValidateRequestFilter
    {
        protected override void HandleInvalidRequest(ActionExecutingContext context)
        {
            var controller = context.Controller as Api.Controllers.ControllerBase;
            context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Result = controller.InvalidRequest();
        }
    }
}
