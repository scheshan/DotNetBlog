using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Core.Model.Comment
{
    public class AddCommentModel
    {
        [Required]
        public int? TopicID { get; set; }

        public int? ReplyTo { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        public string WebSite { get; set; }

        [Required]
        public string Content { get; set; }

        public bool NotifyOnComment { get; set; }
    }
}
