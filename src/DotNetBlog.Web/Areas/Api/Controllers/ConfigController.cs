using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Api.Models.Config;
using AutoMapper;

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
            var model = Mapper.Map<BasicConfigModel>(config);

            return Success(model);
        }

        [HttpPost("basic")]
        public async Task<IActionResult> SaveBasicConfig([FromBody]BasicConfigModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var config = await ConfigService.Get();
            Mapper.Map(model, config);

            await ConfigService.Save(config);

            return Success();
        }

        [HttpGet("email")]
        public async Task<IActionResult> GetEmailConfig()
        {
            var config = await ConfigService.Get();
            var model = Mapper.Map<EmailConfigModel>(config);

            return Success(model);
        }

        [HttpPost("email")]
        public async Task<IActionResult> SaveEmailConfig([FromBody]EmailConfigModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var config = await ConfigService.Get();
            Mapper.Map(model, config);

            await ConfigService.Save(config);

            return Success();
        }
    }
}
