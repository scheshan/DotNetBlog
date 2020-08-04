namespace DotNetBlog.Core.Entity
{
    public class TagTopic
    {
        public int TagID { get; set; }

        public int TopicID { get; set; }

        public virtual Tag Tag { get; set; }

        public virtual Topic Topic { get; set; }
    }
}
