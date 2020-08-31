using DotNetBlog.Core.Model.Widget;
using Microsoft.AspNetCore.Mvc;

namespace DotNetBlog.Web.Widgets
{
    public class AdministrationWidget : ViewComponent
    {
        public IViewComponentResult Invoke(AdministrationWidgetConfigModel config)
        {
            ViewBag.Config = config;

            return View();
        }
    }
}
