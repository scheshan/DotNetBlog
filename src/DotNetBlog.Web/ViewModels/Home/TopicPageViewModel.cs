using DotNetBlog.Core.Model.Topic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class TopicPageViewModel
    {
        public TopicModel Topic { get; set; }

        public TopicModel PrevTopic { get; set; }

        public TopicModel NextTopic { get; set; }

        public List<TopicModel> RelatedTopicList { get; set; }
    }
}
