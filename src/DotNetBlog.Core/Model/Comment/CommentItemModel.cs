using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Comment
{
    public class CommentItemModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }

        public Topic.TopicBasicModel Topic { get; set; }
    }
}
