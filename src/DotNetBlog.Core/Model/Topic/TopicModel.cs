﻿using DotNetBlog.Core.Model.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Topic
{
    public class TopicModel : TopicBasicModel
    {
        public string Alias { get; set; }

        public string Summary { get; set; }

        public string Content { get; set; }

        public CategoryBasicModel[] Categories { get; set; }

        public string[] Tags { get; set; }

        public DateTime Date { get; set; }

        public bool AllowComment { get; set; }

        public Enums.TopicStatus Status { get; set; }
    }
}
