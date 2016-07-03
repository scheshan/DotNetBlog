using DotNetBlog.Core.Model.Topic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Tag
{
    public class TagModel
    {
        public int ID { get; set; }

        public string Keyword { get; set; }

        public TopicCountModel Topics { get; set; }
    }
}
