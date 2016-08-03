
using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents.Widget
{
    public class Widgets : ViewComponent
    {
        private WidgetService WidgetService { get; set; }

        public Widgets(WidgetService widgetService)
        {
            this.WidgetService = widgetService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var widgetList = await this.WidgetService.Query();

            return this.View(widgetList);
        }
    }
}
