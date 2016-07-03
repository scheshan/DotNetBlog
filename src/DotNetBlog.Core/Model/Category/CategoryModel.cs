using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Category
{
    public class CategoryModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public TopicCount Topics { get; set; }

        public class TopicCount
        {
            public int Published { get; set; }

            public int Deleted { get; set; }

            public int All { get; set; }
        }
    }
}
