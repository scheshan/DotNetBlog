using DotNetBlog.Core.Model.Topic;

namespace DotNetBlog.Core.Model.Category
{
    public class CategoryModel : CategoryBasicModel
    {
        public string Description { get; set; }

        public TopicCountModel Topics { get; set; }
    }
}
