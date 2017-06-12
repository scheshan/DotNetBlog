using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Enums;
using DotNetBlog.Core.Model.Widget;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.ViewModels.Install;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;
using DotNetBlog.Core.Model.Install;
using Microsoft.Extensions.Localization;

namespace DotNetBlog.Web.Controllers
{
    [Route("")]
    public class InstallController : Controller
    {
        private InstallService InstallService { get; set; }

        private IOptions<RequestLocalizationOptions> RequestLocalizationOptions { get; set; }

        private IStringLocalizer<InstallController> L { get; set; }

        public InstallController(
            InstallService installService,
            IOptions<RequestLocalizationOptions> requestLocalizationOptions,
            IStringLocalizer<InstallController> l)
        {
            InstallService = installService;
            RequestLocalizationOptions = requestLocalizationOptions;
            L = l;
        }

        [HttpGet("install")]
        public IActionResult Index()
        {
            var vm = CreateViewModel(null);

            return this.View(vm);
        }

        [HttpPost("install")]
        [ValidateAntiForgeryToken]
        public IActionResult Index(InstallModel model)
        {
            if (!ModelState.IsValid)
            {
                var vm = this.CreateViewModel(model);
                vm.ErrorMessage = L["Invalid request"];
                return this.View(vm);
            }

            var result = this.InstallService.TryInstall(model);
            if (result.Success)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                var vm = this.CreateViewModel(model);
                vm.ErrorMessage = result.ErrorMessage;
                return this.View(vm);
            }
        }

        private IndexViewModel CreateViewModel(InstallModel model)
        {
            var vm = new IndexViewModel();

            if (model != null)
            {
                vm.LanguageList = new SelectList(RequestLocalizationOptions.Value.SupportedCultures, "Name", "Name", model.Language);
                vm.Model = model;
            }
            else
            {
                string blogHost = $"{Request.Scheme}://{Request.Host.Host}{(Request.Host.Port == 80 ? "" : ":" + Request.Host.Port)}/";

                vm.LanguageList = new SelectList(RequestLocalizationOptions.Value.SupportedCultures, "Name", "Name");
                vm.Model = new InstallModel
                {
                    BlogHost = blogHost
                };
            }

            return vm;
        }
        
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!InstallService.NeedToInstall())
            {
                context.Result = this.RedirectToAction("Index", "Home");
            }
            else
            {
                base.OnActionExecuting(context);
            }
        }
    }
}
