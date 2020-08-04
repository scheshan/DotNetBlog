using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Comment
{
    public class BatchModel
    {
        [Required]
        public int[] CommentList { get; set; }
    }
}
