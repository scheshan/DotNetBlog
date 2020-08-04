using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;

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
