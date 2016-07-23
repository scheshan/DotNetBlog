using DotNetBlog.Core.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    public class InstallController : Controller
    {
        private BlogContext BlogContext { get; set; }

        public InstallController(BlogContext blogContext)
        {
            this.BlogContext = blogContext;
        }

        [HttpGet("install")]
        public async Task<IActionResult> Index()
        {
            if (await this.BlogContext.Database.EnsureCreatedAsync())
            {
                var user = new Core.Entity.User
                {
                    UserName = "admin",
                    Password = Core.Utilities.EncryptHelper.MD5("admin"),
                    Nickname = "系统管理员",
                    Email = "admin@dotnetblog.com"
                };

                this.BlogContext.Users.Add(user);

                await this.BlogContext.SaveChangesAsync();
            }

            return RedirectToAction("Index", "Home");
        }
    }
}
