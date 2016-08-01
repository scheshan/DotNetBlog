using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Entity
{
    public class Widget
    {
        public Enums.WidgetType Type { get; set; }

        public string Title { get; set; }

        public string Config { get; set; }

        public int Order { get; set; }
    }
}
