using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Api.Models.Config;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Area("api")]
    [Route("api/config")]
    public class ConfigController : ControllerBase
    {
        private ConfigService ConfigService { get; set; }

        public ConfigController(ConfigService configService)
        {
            ConfigService = configService;
        }

        [HttpGet("basic")]
        public async Task<IActionResult> GetBasicConfig()
        {
            var config = await ConfigService.Get();
            var model = new BasicConfigModel
            {
                Description = config.Description,
                OnlyShowSummary = config.OnlyShowSummary,
                Title = config.Title,
                TopicsPerPage = config.TopicsPerPage
            };

            return Success(model);
        }

        [HttpPost("basic")]
        public async Task<IActionResult> SaveBasicConfig(BasicConfigModel model)
        {
            if (model == null)
            {
                return InvalidRequest();
            }

            var config = await ConfigService.Get();
            config.Description = model.Description;
            config.Title = model.Title;
            config.OnlyShowSummary = model.OnlyShowSummary;
            config.TopicsPerPage = model.TopicsPerPage;

            await ConfigService.Save(config);

            return Success();
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
