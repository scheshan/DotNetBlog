using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Account.Controllers
{
    [Area("account")]
    [Route("account")]
    public class HomeController : Controller
    {
        [HttpGet("login")]
        public IActionResult Login()
        {
            return View();
        }
    }
}
