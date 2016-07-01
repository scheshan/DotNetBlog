using DotNetBlog.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Entity
{
    public class Topic
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Alias { get; set; }

        public string Summary { get; set; }

        public bool AllowComment { get; set; }

        public TopicStatus Status { get; set; }

        public int CreateUserID { get; set; }

        public DateTime CreateDate { get; set; }

        public int EditUserID { get; set; }

        public DateTime EditDate { get; set; }
    }
}
