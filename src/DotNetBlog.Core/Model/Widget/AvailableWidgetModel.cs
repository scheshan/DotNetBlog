namespace DotNetBlog.Core.Model.Widget
{
    public class AvailableWidgetModel
    {
        public Enums.WidgetType Type { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }

        public WidgetConfigModelBase DefaultConfig { get; set; }
    }
}
