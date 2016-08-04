using DotNetBlog.Core.Model.Widget;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
