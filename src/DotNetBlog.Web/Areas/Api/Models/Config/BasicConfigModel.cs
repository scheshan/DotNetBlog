using System;
using System.ComponentModel.DataAnnotations;

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

        public string Language { get; set; }

        public string Theme { get; set; }
    }
}
