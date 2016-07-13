using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using DotNetBlog.Core;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DotNetBlog.Web.Filters
{
    public class RequireLoginFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            ClientManager clientManager = context.HttpContext.RequestServices.GetService<ClientManager>();
            if (!clientManager.IsLogin)
            {
                this.HandleUnauthorizedRequest(context);
            }
            else
            {
                base.OnActionExecuting(context);
            }
        }

        protected virtual void HandleUnauthorizedRequest(ActionExecutingContext context)
        {            
            string sourceUrl = null;
            if (context.HttpContext.Request.Path.HasValue)
            {
                sourceUrl = context.HttpContext.Request.Path.Value;

                if (context.HttpContext.Request.QueryString.HasValue)
                {
                    sourceUrl += context.HttpContext.Request.QueryString.Value;
                }
            }

            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;

            context.Result = new RedirectToActionResult("Login", "Home", new { area = "Account", redirect = sourceUrl });
            
        }
    }
}
