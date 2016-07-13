using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Entity
{
    public class Comment
    {
        public int ID { get; set; }

        public int TopicID { get; set; }

        public int? ReplyToID { get; set; }

        public Enums.CommentStatus Status { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        public string WebSite { get; set; }

        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public string CreateIP { get; set; }

        public bool NotifyOnComment { get; set; }

        public int? UserID { get; set; }

        public User User { get; set; }
    }
}
