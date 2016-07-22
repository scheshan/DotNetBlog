using DotNetBlog.Core.Service;
using DotNetBlog.Web.Areas.Api.Models.Topic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Area("Api")]
    [Route("api/topic")]
    public class TopicController : ControllerBase
    {
        private TopicService TopicService { get; set; }

        public TopicController(TopicService topicService)
        {
            TopicService = topicService;
        }

        [HttpPost("")]
        public async Task<IActionResult> Add([FromBody]SaveTopicModel model)
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

        [HttpPost("{id:int}")]
        public async Task<IActionResult> Edit([FromRoute]int id, [FromBody]SaveTopicModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            var result = await TopicService.Edit(id, model.Title, model.Content, model.Status, model.CategoryList, model.TagList, model.Alias, model.Summary, model.Date, model.AllowComment);
            if (result.Success)
            {
                return Success();
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

        [HttpPost("batch/publish")]
        public async Task<IActionResult> BatchPublish([FromBody]BatchModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            await this.TopicService.BatchUpdateStatus(model.TopicList, Core.Enums.TopicStatus.Published);

            return Success();
        }

        [HttpPost("batch/draft")]
        public async Task<IActionResult> BatchDraft([FromBody]BatchModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            await this.TopicService.BatchUpdateStatus(model.TopicList, Core.Enums.TopicStatus.Normal);

            return Success();
        }

        [HttpPost("batch/trash")]
        public async Task<IActionResult> BatchTrash([FromBody]BatchModel model)
        {
            if (model == null || !ModelState.IsValid)
            {
                return InvalidRequest();
            }

            await this.TopicService.BatchUpdateStatus(model.TopicList, Core.Enums.TopicStatus.Trash);

            return Success();
        }
    }
}
