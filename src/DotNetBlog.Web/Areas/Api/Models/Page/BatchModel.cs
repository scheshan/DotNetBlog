using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Page
{
    public class BatchModel
    {
        [Required]
        public int[] PageList { get; set; }
    }
}
