using DotNetBlog.Core.Model.Topic;
using System.Collections.Generic;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class TopicListModel
    {
        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public List<TopicModel> Data { get; set; }

        public int Total { get; set; }
    }
}
