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

namespace DotNetBlog.Web.Controllers
{
    public class InstallController : Controller
    {
        private BlogContext BlogContext { get; set; }

        private static ILogger Logger = LogManager.GetCurrentClassLogger();

        private IHtmlLocalizer<InstallController> L { get; set; }

        private InstallService InstallService { get; set; }

        private SettingService SettingService { get; set; }

        private IOptions<RequestLocalizationOptions> LocOptions { get; set; }

        public InstallController(BlogContext blogContext,
            IHtmlLocalizer<InstallController> localizer,
            IOptions<RequestLocalizationOptions> LocOptions,
            InstallService installService,
            SettingService settingService)
        {
            this.BlogContext = blogContext;
            this.L = localizer;
            this.InstallService = installService;
            this.SettingService = settingService;
        }

        [HttpGet("install")]
        public async Task<IActionResult> Index([FromForm] InstallConfig model)
        {
            try
            {
                await InstallService.Install(model.AdminUsername ?? "admin",
                    model.AdminPassword ?? "admin",
                    model.Nickname ?? L["System Administrator"].Value,
                    model.Email ?? "admin@dotnetblog.com");

                var lang = model.Language ?? "en-GB";

                //TODO: fox this problem
                /**
                 * I should find a solution to validate this language it's exitst or not
                 * the code at below should work but we should check why LocOptions become null
                 * https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization
                 */
                //var langExists = LocOptions.Value.SupportedUICultures.Any(a => a.Name.Equals(lang, StringComparison.OrdinalIgnoreCase));

                //if (langExists)
                {
                    var settings = SettingService.Get();
                    settings.Language = lang;
                    await SettingService.Save(settings);
                }

                return RedirectToAction("Index", "Home");
            }
            catch (Exception ex)
            {
                Logger.Error(ex, ex.Message);
                return this.Content(ex.Message);
            }
        }
    }
}
