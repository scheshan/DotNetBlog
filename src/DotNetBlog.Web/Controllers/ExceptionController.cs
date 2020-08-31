using DotNetBlog.Core.Service;
using DotNetBlog.Web.ViewModels.Exception;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNetBlog.Web.Controllers
{
    [Route("exception")]
    public class ExceptionController : Controller
    {
        private SettingService SettingService { get; set; }

        public ExceptionController(SettingService settingService)
        {
            SettingService = settingService;
        }

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
            ErrorViewModel vm = new ErrorViewModel();

            var config = SettingService.Get();
            vm.Title = config.ErrorPageTitle;
            vm.Content = config.ErrorPageContent;

            return this.View("Error", vm);
        }
    }
}
