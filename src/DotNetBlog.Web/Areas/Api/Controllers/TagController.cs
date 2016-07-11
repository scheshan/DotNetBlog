using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Api.Models.Tag;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Area("api")]
    [Route("api/tag")]
    public class TagController : ControllerBase
    {
        private TagService TagService { get; set; }

        public TagController(TagService tagService)
        {
            TagService = tagService;
        }

        [HttpGet("query")]
        public async Task<IActionResult> Query([FromQuery]QueryTagModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var result = await TagService.Query(model.PageIndex, model.PageSize, model.Keywords);

            return this.PagedData(result.Data, result.Total);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody]DeleteTagModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            await this.TagService.Delete(model.TagList);

            return this.Success();
        }

        [HttpPost("{id:int}")]
        public async Task<IActionResult> Edit([FromRoute]int id, [FromBody]SaveTagModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var result = await this.TagService.Edit(id, model.Keyword);

            if (result.Success)
            {
                return Success();
            }
            else
            {
                return Error(result.ErrorMessage);
            }
        }
    }
}
