﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents
{
    public class SearchWidget : ViewComponent
    {
        public SearchWidget()
        {

        }

        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
