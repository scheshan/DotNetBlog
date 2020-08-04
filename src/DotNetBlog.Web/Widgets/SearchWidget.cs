using DotNetBlog.Core.Model.Widget;
using Microsoft.AspNetCore.Mvc;

namespace DotNetBlog.Web.Widgets
{
    public class SearchWidget : ViewComponent
    {
        public SearchWidget()
        {

        }

        public IViewComponentResult Invoke(SearchWidgetConfigModel config)
        {
            ViewBag.Config = config;

            return View();
        }
    }
}
