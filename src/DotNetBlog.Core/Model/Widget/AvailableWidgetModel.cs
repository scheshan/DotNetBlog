using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Widget
{
    public class AvailableWidgetModel
    {
        public Enums.WidgetType Type { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }
    }
}
