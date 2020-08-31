using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Tag
{
    public class DeleteTagModel
    {
        [Required]
        public int[] TagList { get; set; }
    }
}
