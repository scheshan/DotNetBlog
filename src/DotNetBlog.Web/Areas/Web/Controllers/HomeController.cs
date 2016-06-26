using DotNetBlog.Core.Data;
using DotNetBlog.Core.Service;
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
        private ConfigService ConfigService { get; set; }

        public HomeController(ConfigService configService)
        {
            this.ConfigService = configService;
        }

        [Route("")]
        public async Task<IActionResult> Index()
        {
            return new ObjectResult(null);
        }
    }
}
