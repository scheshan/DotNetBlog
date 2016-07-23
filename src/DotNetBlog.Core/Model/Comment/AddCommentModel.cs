using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Comment
{
    public class AddCommentModel
    {
        [Required]
        public int? TopicID { get; set; }

        public int? ReplyTo { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        public string WebSite { get; set; }

        [Required]
        public string Content { get; set; }

        public bool NotifyOnComment { get; set; }
    }
}
