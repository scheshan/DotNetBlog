using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Api.Models.Topic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Area("api")]
    [Route("api/topic")]
    public class TopicController : ControllerBase
    {
        private TopicService TopicService { get; set; }

        public TopicController(TopicService topicService)
        {
            TopicService = topicService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody]AddTopicModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var result = await TopicService.Add(model.Title, model.Content, model.Status, model.CategoryList, model.TagList, model.Alias, model.Summary, model.Date, model.AllowComment);
            if (result.Success)
            {
                return Success(result.Data);
            }
            else
            {
                return Error(result.ErrorMessage);
            }
        }

        [HttpGet("query")]
        public async Task<IActionResult> Query([FromQuery]QueryTopicModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var result = await TopicService.QueryNotTrash(model.PageIndex, model.PageSize, model.Status, model.Keywords);
            if (result.Success)
            {
                return PagedData(result.Data, result.Total);
            }
            else
            {
                return Error(result.ErrorMessage);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var model = await TopicService.Get(id);
            if(model == null)
            {
                return Error("文章不存在");
            }
            return Success(model);
        }
    }
}
