using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Upload
{
    public class UploadImageModel
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
