using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Comment
{
    public class CommentModel
    {
        public int ID { get; set; }

        public int TopicID { get; set; }

        public int? ReplyToID { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string WebSite { get; set; }

        public string Content { get; set; }

        public Enums.CommentStatus Status { get; set; }

        public DateTime CreateDate { get; set; }

        public string CreateIP { get; set; }

        public class UserModel
        {
            public int ID { get; set; }

            public string UserName { get; set; }

            public string Email { get; set; }

            public string Display { get; set; }
        }
    }
}
