namespace DotNetBlog.Core.Model.Statistics
{
    public class BlogStatisticsModel
    {
        public Topic.TopicCountModel Topics { get; set; }

        public Comment.CommentCountModel Comments { get; set; }

        public Page.PageCountModel Pages { get; set; }
    }
}
