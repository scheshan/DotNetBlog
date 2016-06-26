using DotNetBlog.Core.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Web.Controllers
{
    [Area("web")]
    [Route("")]
    public class HomeController : Controller
    {
        private BlogContext DbContext { get; set; }

        public HomeController(BlogContext dbContext)
        {
            this.DbContext = dbContext;
        }

        [Route("")]
        public IActionResult Index()
        {
            var l = this.DbContext.Settings.ToList();

            return this.Content("hello world");
        }
    }
}
