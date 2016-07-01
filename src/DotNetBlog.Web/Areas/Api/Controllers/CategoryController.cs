using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Category;
using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Api.Models.Category;
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
        public async Task<IActionResult> All()
        {
            var list = await CategoryService.All();

            return Success(list);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] AddCategoryModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            OperationResult<CategoryModel> result = await CategoryService.Add(model.Name, model.Description);

            if(result.Success)
            {
                return Success(result.Data);
            }
            else
            {
                return Error(result.ErrorMessage);
            }
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit([FromBody] EditCategoryModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            OperationResult<CategoryModel> result = await CategoryService.Edit(model.ID.Value, model.Name, model.Description);

            if (result.Success)
            {
                return Success(result.Data);
            }
            else
            {
                return Error(result.ErrorMessage);
            }
        }

        [HttpPost("remove")]
        public async Task<IActionResult> Remove([FromBody] RemoveCategoryModel model)
        {
            if(model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            await CategoryService.Remove(model.IDList);

            return Success();
        }
    }
}
