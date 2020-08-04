using System;

namespace DotNetBlog.Core.Model.Topic
{
    public class MonthStatisticsModel
    {
        public DateTime Month { get; set; }

        public TopicCountModel Topics { get; set; }
    }
}
