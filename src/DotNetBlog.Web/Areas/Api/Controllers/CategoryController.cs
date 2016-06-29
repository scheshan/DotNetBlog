using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Area("api")]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private CategoryService CategoryService { get; set; }

        public CategoryController(CategoryService categoryService)
        {
            CategoryService = categoryService;
        }

        [HttpGet("all")]
        public IActionResult All()
        {
            var list = CategoryService.All();

            return Success(list);
        }
    }
}
