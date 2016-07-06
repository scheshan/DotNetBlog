using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Tag
{
    public class QueryTagModel
    {
        [Range(1, int.MaxValue)]
        public int PageIndex { get; set; }

        [Range(1, 100)]
        public int PageSize { get; set; }
    }
}
