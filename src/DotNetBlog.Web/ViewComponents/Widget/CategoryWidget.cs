using DotNetBlog.Core.Model.Category;
using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewComponents.Widget
{
    public class CategoryWidget : ViewComponent
    {
        private CategoryService CategoryService { get; set; }

        public CategoryWidget(CategoryService categoryService)
        {
            CategoryService = categoryService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            List<CategoryModel> categoryList = await CategoryService.All();
            return this.View(categoryList);
        }
    }
}
