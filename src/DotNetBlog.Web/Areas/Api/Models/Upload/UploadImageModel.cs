using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Upload
{
    public class UploadImageModel
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
