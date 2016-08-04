using DotNetBlog.Core.Model.Widget;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
