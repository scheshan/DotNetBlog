using DotNetBlog.Web.ViewModels.Notice;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Filters
{
    public class ErrorHandleFilter : ExceptionFilterAttribute
    {
        private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();

        public override void OnException(ExceptionContext context)
        {
            Logger.Error(context.Exception, context.Exception.Message);

            base.OnException(context);

            //var viewResult = new ViewResult
            //{
            //    StatusCode = StatusCodes.Status500InternalServerError,
            //    ViewName = "~/Views/Shared/_Error.cshtml"                
            //};

            //viewResult.ViewData.Model = new ErrorPageViewModel
            //{
            //    Title = "",
            //    Content = ""
            //};

            //context.Result = viewResult;            
        }
    }
}
