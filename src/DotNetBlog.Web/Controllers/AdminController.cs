using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    [Route("admin")]
    [Filters.RequireLoginFilter]
    public class AdminController : Controller
    {
        [Route("{*path}")]
        public IActionResult Index()
        {
            return this.View();
        }
    }
}
