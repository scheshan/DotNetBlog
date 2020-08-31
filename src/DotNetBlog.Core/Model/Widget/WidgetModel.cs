using DotNetBlog.Core.Enums;

namespace DotNetBlog.Core.Model.Widget
{
    public class WidgetModel
    {
        public WidgetType Type { get; set; }

        public WidgetConfigModelBase Config { get; set; }
    }
}
