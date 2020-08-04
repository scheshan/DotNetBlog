using DotNetBlog.Core.Model.Category;
using System;

namespace DotNetBlog.Core.Model.Topic
{
    public class TopicModel : TopicBasicModel, ITopicModel
    {
        public string Summary { get; set; }

        public string Content { get; set; }

        public CategoryBasicModel[] Categories { get; set; }

        public string[] Tags { get; set; }

        public DateTime Date { get; set; }

        public bool AllowComment { get; set; }

        public Enums.TopicStatus Status { get; set; }
    }
}
