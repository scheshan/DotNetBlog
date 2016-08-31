using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Config
{
    public class BasicConfigModel
    {
        [Required]
        public string Host { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Range(1, 100)]
        public int TopicsPerPage { get; set; }

        public bool OnlyShowSummary { get; set; }
    }
}
