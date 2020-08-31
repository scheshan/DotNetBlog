using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Tag
{
    public class SaveTagModel
    {
        [Required]
        [StringLength(50)]
        public string Keyword { get; set; }
    }
}
