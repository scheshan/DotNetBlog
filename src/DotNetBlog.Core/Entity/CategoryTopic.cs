namespace DotNetBlog.Core.Entity
{
    public class CategoryTopic
    {
        public int CategoryID { get; set; }

        public int TopicID { get; set; }

        public virtual Category Category { get; set; }

        public virtual Topic Topic { get; set; }
    }
}
