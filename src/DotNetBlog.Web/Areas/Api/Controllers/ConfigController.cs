using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Api.Models.Config;
using AutoMapper;
using DotNetBlog.Core.Model.Email;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Area("Api")]
    [Route("api/config")]
    public class ConfigController : ControllerBase
    {
        private SettingService SettingService { get; set; }

        private EmailService EmailService { get; set; }

        public ConfigController(SettingService settingService, EmailService emailService)
        {
            SettingService = settingService;
            EmailService = emailService;
        }

        [HttpGet("basic")]
        public IActionResult GetBasicConfig()
        {
            var config = SettingService.Get();
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

            var config = SettingService.Get();
            Mapper.Map(model, config);

            await SettingService.Save(config);

            return Success();
        }

        [HttpGet("email")]
        public IActionResult GetEmailConfig()
        {
            var config = SettingService.Get();
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

            var config = SettingService.Get();
            Mapper.Map(model, config);

            await SettingService.Save(config);

            return Success();
        }

        [HttpPost("email/test")]
        public async Task<IActionResult> TestEmailConfig([FromBody]EmailConfigModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var testEmailConfigModel = new TestEmailConfigModel
            {
                EmailAddress = model.SmtpEmailAddress,
                Password = model.SmtpPassword,
                Port = model.SmtpPort,
                Server = model.SmtpServer,
                User = model.SmtpUser
            };

            var result = await this.EmailService.TestEmailConfig(testEmailConfigModel);

            if (result.Success)
            {
                return this.Success();
            }
            else
            {
                return this.Error(result.ErrorMessage);
            }
        }
        
        [HttpGet("comment")]
        public IActionResult GetCommentConfig()
        {
            var config = SettingService.Get();
            var model = Mapper.Map<CommentConfigModel>(config);

            return Success(model);
        }

        [HttpPost("comment")]
        public async Task<IActionResult> SaveCommentConfig([FromBody]CommentConfigModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var config = SettingService.Get();
            Mapper.Map(model, config);

            await SettingService.Save(config);

            return Success();
        }
    }
}
