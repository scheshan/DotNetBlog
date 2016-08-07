using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    [Route("exception")]
    public class ExceptionController : Controller
    {
        [HttpGet("{code:int}")]
        public IActionResult Error(int code)
        {
            if (code == StatusCodes.Status500InternalServerError)
            {
                return this.RenderErrorPage();
            }
            else if (code == StatusCodes.Status404NotFound)
            {
                return this.RenderNotFoundPage();
            }
            else
            {
                return this.Content("");
            }
        }

        [NonAction]
        private IActionResult RenderNotFoundPage()
        {
            return this.View("NotFound");
        }

        [NonAction]
        private IActionResult RenderErrorPage()
        {
            return this.View("Error");
        }
    }
}
