using DotNetBlog.Core.Data;
using DotNetBlog.Core.Model.Statistics;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class StatisticsService
    {
        private BlogContext BlogContext { get; set; }

        public StatisticsService(BlogContext blogContext)
        {
            this.BlogContext = blogContext;
        }

        public async Task<BlogStatisticsModel> GetBlogStatistics()
        {
            var model = new BlogStatisticsModel
            {
                Comments = new Model.Comment.CommentCountModel(),
                Pages = new Model.Page.PageCountModel(),
                Topics = new Model.Topic.TopicCountModel()
            };

            var topicQuery = this.BlogContext.Topics
                .ToArray()
                .GroupBy(t => t.Status)
                .ToDictionary(t => t.Key, t => t.Count());

            var pageQuery = this.BlogContext.Pages
                .ToArray()
                .GroupBy(t => t.Status)
                .ToDictionary(t => t.Key, t => t.Count());

            var commentQuery = this.BlogContext.Comments
                .ToArray()
                .GroupBy(t => t.Status)
                .ToDictionary(t => t.Key, t => t.Count());

            if (topicQuery.ContainsKey(Enums.TopicStatus.Published))
            {
                model.Topics.Published = topicQuery[Enums.TopicStatus.Published];
            }
            if (topicQuery.ContainsKey(Enums.TopicStatus.Trash))
            {
                model.Topics.Draft = topicQuery[Enums.TopicStatus.Trash];
            }
            model.Topics.All = topicQuery.Sum(t => t.Value);

            if (pageQuery.ContainsKey(Enums.PageStatus.Published))
            {
                model.Pages.Published = pageQuery[Enums.PageStatus.Published];
            }
            if (pageQuery.ContainsKey(Enums.PageStatus.Draft))
            {
                model.Pages.Draft = pageQuery[Enums.PageStatus.Draft];
            }
            model.Pages.All = pageQuery.Sum(t => t.Value);

            if (commentQuery.ContainsKey(Enums.CommentStatus.Approved))
            {
                model.Comments.Approved = commentQuery[Enums.CommentStatus.Approved];
            }
            if (commentQuery.ContainsKey(Enums.CommentStatus.Pending))
            {
                model.Comments.Pending = commentQuery[Enums.CommentStatus.Pending];
            }
            if (commentQuery.ContainsKey(Enums.CommentStatus.Reject))
            {
                model.Comments.Reject = commentQuery[Enums.CommentStatus.Reject];
            }
            model.Comments.Total = commentQuery.Sum(t => t.Value);

            return model;
        }
    }
}
