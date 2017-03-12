using DotNetBlog.Web.Areas.Api.Models.Upload;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private IHostingEnvironment Enviroment { get; set; }

        private IHtmlLocalizer<UploadController> L { get; set; }

        private static readonly string[] AvailableImageExtensionList = new string[] { ".jpg", ".png", ".gif", ".bmp", "" };

        public UploadController(IHostingEnvironment enviroment, IHtmlLocalizer<UploadController> localizer)
        {
            this.Enviroment = enviroment;
            this.L = localizer;
        }

        [HttpPost("image")]
        public async Task<IActionResult> UploadImage([FromForm]UploadImageModel model)
        {
            if (model == null)
            {
                return this.InvalidRequest();
            }

            string extension = Path.GetExtension(model.File.FileName);

            if (!AvailableImageExtensionList.Contains(extension, StringComparer.CurrentCultureIgnoreCase))
            {
                return this.Error(L["Please upload the correct format image file"].Value);
            }

            string fileName = $"/upload/image/{Guid.NewGuid().ToString()}{extension.ToLower()}";

            string physicalPath = this.Enviroment.ContentRootPath + "/App_Data" + fileName;
            string directoryName = Path.GetDirectoryName(physicalPath);

            if (!Directory.Exists(directoryName))
            {
                Directory.CreateDirectory(directoryName);
            }

            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
                await model.File.CopyToAsync(stream);
            }

            return this.Success(fileName);
        }
    }
}
