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

            var result = await TagService.Query(model.PageIndex, model.PageSize);

            return this.PagedData(result.Data, result.Total);
        }
    }
}
