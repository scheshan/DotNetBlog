using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using NLog;
using DotNetBlog.Web.Areas.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace DotNetBlog.Web.Areas.Api.Filters
{
    public class ErrorHandlerFilter : ExceptionFilterAttribute
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public override void OnException(ExceptionContext context)
        {
            Logger.Error(context.Exception, context.Exception.Message);

            var apiResponse = new ApiResponse
            {
                Success = false,
                ErrorMessage = "服务器发生错误"
            };

            context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Result = new JsonResult(apiResponse);
        }
    }
}
