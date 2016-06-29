using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Entity
{
    public class CategoryTopic
    {
        public int CategoryID { get; set; }

        public int TopicID { get; set; }

        public virtual Category Category { get; set; }
    }
}
