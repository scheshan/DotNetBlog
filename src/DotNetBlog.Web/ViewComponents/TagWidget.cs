using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents
{
    public class TagWidget : ViewComponent
    {
        private TagService TagService { get; set; }

        public TagWidget(TagService tagService)
        {
            TagService = tagService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var tagList = await TagService.All();
            return View(tagList);
        }
    }
}
