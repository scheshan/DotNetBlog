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
    [Area("Api")]
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

        [HttpPost("")]
        public async Task<IActionResult> Add([FromBody] SaveCategoryModel model)
        {
            if (model == null)
            {
                return InvalidRequest();
            }

            OperationResult<int> result = await CategoryService.Add(model.Name, model.Description);

            if(result.Success)
            {
                return Success(result.Data);
            }
            else
            {
                return Error(result.ErrorMessage);
            }
        }

        [HttpPost("{id:int}")]
        public async Task<IActionResult> Edit([FromRoute]int id, [FromBody] SaveCategoryModel model)
        {
            if (model == null)
            {
                return InvalidRequest();
            }

            OperationResult result = await CategoryService.Edit(id, model.Name, model.Description);

            if (result.Success)
            {
                return Success();
            }
            else
            {
                return Error(result.ErrorMessage);
            }
        }

        [HttpPost("remove")]
        public async Task<IActionResult> Remove([FromBody] RemoveCategoryModel model)
        {
            if(model == null)
            {
                return InvalidRequest();
            }

            await CategoryService.Remove(model.IDList);

            return Success();
        }
    }
}
