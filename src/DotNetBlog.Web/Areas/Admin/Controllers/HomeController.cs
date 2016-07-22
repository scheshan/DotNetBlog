using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Route("admin")]
    [Filters.RequireLoginFilter]
    public class HomeController : Controller
    {
        [Route("{*path}")]
        public IActionResult Index()
        {
            return this.View();
        }
    }
}
