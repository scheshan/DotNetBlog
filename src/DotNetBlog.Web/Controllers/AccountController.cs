using DotNetBlog.Core;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.ViewModels.Account;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Controllers
{
    [Route("account")]
    [Filters.ErrorHandleFilter]
    public class AccountController : Controller
    {
        private AuthService AuthService { get; set; }

        private UserService UserService { get; set; }

        private ClientManager ClientManager { get; set; }

        private IHtmlLocalizer<AccountController> L { get; set; }

        public AccountController(AuthService authService, ClientManager clientManager, UserService userService, IHtmlLocalizer<AccountController> localizer)
        {
            this.AuthService = authService;
            this.ClientManager = clientManager;
            this.UserService = userService;
            this.L = localizer;
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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromForm] LoginModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await this.AuthService.Login(model.UserName, model.Password);

            if (result.Success)
            {
                ClientManager.WriteTokenIntoCookies(this.HttpContext, result.Data, model.RememberMe);

                if (model.Redirect != null)
                {
                    return Redirect(model.Redirect);
                }
                else
                {
                    return RedirectToAction("Index", "Home");
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
        [Filters.RequireLoginFilter]
        public async Task<IActionResult> LogOff()
        {
            await AuthService.LogOff(this.ClientManager.Token);

            ClientManager.ClearTokenFromCookies(this.HttpContext);

            return RedirectToAction("Index", "Home");
        }

        [HttpGet("changepassword")]
        [Filters.RequireLoginFilter]
        public IActionResult ChangePassword()
        {
            var vm = new ChangePasswordViewModel();

            return View(vm);
        }

        [HttpPost("changepassword")]
        [Filters.RequireLoginFilter]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword([FromForm] ChangePasswordModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var vm = new ChangePasswordViewModel();

            var result = await this.UserService.ChangePassword(this.ClientManager.CurrentUser.ID, model.OldPassword, model.Password);

            if (result.Success)
            {
                vm.SuccessMessage = L["Successful operation"].Value;
            }
            else
            {
                vm.ErrorMessage = result.ErrorMessage;
            }

            return View(vm);
        }
    }
}
