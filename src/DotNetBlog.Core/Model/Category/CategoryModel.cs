using DotNetBlog.Core.Model.Topic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Category
{
    public class CategoryModel : CategoryBasicModel
    {
        public string Description { get; set; }

        public TopicCountModel Topics { get; set; }
    }
}
