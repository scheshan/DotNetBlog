using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.My
{
    public class EditMyInfoModel
    {
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(20)]
        public string Nickname { get; set; }
    }
}
