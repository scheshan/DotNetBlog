using System;
using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Tag
{
    public class QueryTagModel
    {
        [Range(1, int.MaxValue)]
        public int PageIndex { get; set; }

        [Range(1, 100)]
        public int PageSize { get; set; }

        public string Keywords { get; set; }
    }
}
