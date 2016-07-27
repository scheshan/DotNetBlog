using DotNetBlog.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Topic
{
    public class AddTopicModel
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [StringLength(100)]
        public string Alias { get; set; }

        [StringLength(200)]
        public string Summary { get; set; }

        public int[] CategoryList { get; set; }

        public string[] TagList { get; set; }

        public bool AllowComment { get; set; }

        public DateTime? Date { get; set; }

        public TopicStatus Status { get; set; }
    }
}
