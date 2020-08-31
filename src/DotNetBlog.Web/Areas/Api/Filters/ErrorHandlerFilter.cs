using DotNetBlog.Web.Areas.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.DependencyInjection;
using NLog;

namespace DotNetBlog.Web.Areas.Api.Filters
{
    public class ErrorHandlerFilter : ExceptionFilterAttribute
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public override void OnException(ExceptionContext context)
        {
            var L = context.HttpContext.RequestServices.GetService<IHtmlLocalizer<ErrorHandlerFilter>>();
            Logger.Error(context.Exception, context.Exception.Message);

            var apiResponse = new ApiResponse
            {
                Success = false,
                ErrorMessage = L["The server has encountered an error"].Value
            };

            context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Result = new JsonResult(apiResponse);
        }
    }
}
