using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Comment
{
    public class ReplyCommentModel
    {
        public int ReplyTo { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
