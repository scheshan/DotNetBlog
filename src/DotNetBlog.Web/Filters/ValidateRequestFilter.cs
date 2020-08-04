using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DotNetBlog.Web.Filters
{
    public class ValidateRequestFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                this.HandleInvalidRequest(context);
            }
            else
            {
                base.OnActionExecuting(context);
            }
        }

        protected virtual void HandleInvalidRequest(ActionExecutingContext context)
        {
            context.Result = new StatusCodeResult(StatusCodes.Status400BadRequest);
        }
    }
}
