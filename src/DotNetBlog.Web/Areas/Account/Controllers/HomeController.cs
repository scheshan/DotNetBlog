using DotNetBlog.Core;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Account.Models.Home;
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
        private AuthService AuthService { get; set; }

        private ClientManager ClientManager { get; set; }

        public HomeController(AuthService authService, ClientManager clientManager)
        {
            this.AuthService = authService;
            this.ClientManager = clientManager;
        }

        [HttpGet("login")]
        public IActionResult Login(string redirect = null)
        {
            var vm = new LoginViewModel
            {
                ErrorMessage = null,
                Model = new LoginModel
                {
                    Redirect = redirect
                }
            };

            return View(vm);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm]LoginModel model)
        {
            var result = await this.AuthService.Login(model.UserName, model.Password);

            if (result.Success)
            {
                ClientManager.WriteTokenIntoCookies(this.HttpContext, result.Data);

                if (model.Redirect != null)
                {
                    return Redirect(model.Redirect);
                }
                else
                {
                    return RedirectToAction("Index", "Home", new { area = "admin" });
                }
            }
            else
            {
                var vm = new LoginViewModel
                {
                    ErrorMessage = result.ErrorMessage,
                    Model = model
                };
                return View(vm);
            }
        }

        [HttpGet("logoff")]
        public async Task<IActionResult> LogOff()
        {
            await AuthService.LogOff(this.ClientManager.Token);

            return RedirectToAction("Index", "Home", new { area = "Web" });
        }
    }
}
