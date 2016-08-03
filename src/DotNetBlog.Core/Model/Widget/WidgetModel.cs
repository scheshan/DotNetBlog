using DotNetBlog.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Widget
{
    public class WidgetModel
    {
        public WidgetType Type { get; set; }

        public WidgetConfigModelBase Config { get; set; }
    }
}
