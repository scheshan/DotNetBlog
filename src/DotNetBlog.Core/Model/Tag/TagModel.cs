using DotNetBlog.Core.Model.Topic;

namespace DotNetBlog.Core.Model.Tag
{
    public class TagModel
    {
        public int ID { get; set; }

        public string Keyword { get; set; }

        public TopicCountModel Topics { get; set; }
    }
}
