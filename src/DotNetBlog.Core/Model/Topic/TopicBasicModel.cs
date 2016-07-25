using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Topic
{
    public class TopicBasicModel
    {
        public int ID { get; set; }

        public string Title { get; set; }
        
        public Comment.CommentCountModel Comments { get; set; }
    }
}
