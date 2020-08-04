using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Category
{
    public class SaveCategoryModel
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(200)]
        public string Description { get; set; }
    }
}
