using DotNetBlog.Web.Areas.Api.Models.Upload;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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

        private static readonly string[] AvailableImageExtensionList = new string[] { ".jpg", ".png", ".gif", ".bmp", "" };

        public UploadController(IHostingEnvironment enviroment)
        {
            this.Enviroment = enviroment;
        }

        [HttpPost("image")]
        public async Task<IActionResult> UploadImage([FromForm]UploadImageModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return this.InvalidRequest();
            }

            string extension = Path.GetExtension(model.File.FileName);

            if (!AvailableImageExtensionList.Contains(extension, StringComparer.CurrentCultureIgnoreCase))
            {
                return this.Error("请上传正确格式的图片文件");
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
