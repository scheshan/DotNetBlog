using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Topic
{
    public class TopicCountModel
    {
        public int Published { get; set; }

        public int Deleted { get; set; }

        public int All { get; set; }
    }
}
