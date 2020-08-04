using DotNetBlog.Core.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Topic
{
    public class QueryTopicModel
    {
        [Range(1, int.MaxValue)]
        public int PageIndex { get; set; }

        [Range(1, 100)]
        public int PageSize { get; set; }

        public string Keywords { get; set; }

        public TopicStatus? Status { get; set; }
    }
}
