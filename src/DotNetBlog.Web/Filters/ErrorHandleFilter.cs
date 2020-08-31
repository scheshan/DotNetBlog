using Microsoft.AspNetCore.Mvc.Filters;
using NLog;

namespace DotNetBlog.Web.Filters
{
    public class ErrorHandleFilter : ExceptionFilterAttribute
    {
        private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();

        public override void OnException(ExceptionContext context)
        {
            Logger.Error(context.Exception, context.Exception.Message);

            base.OnException(context);
        }
    }
}
