using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using NLog;

namespace DotNetBlog.Web.Areas.Api.Filters
{
    public class ErrorHandlerFilter : ExceptionFilterAttribute
    {
        private static readonly Logger logger = LogManager.GetCurrentClassLogger();

        public override void OnException(ExceptionContext context)
        {
            logger.Error(context.Exception);

            base.OnException(context);
        }
    }
}
