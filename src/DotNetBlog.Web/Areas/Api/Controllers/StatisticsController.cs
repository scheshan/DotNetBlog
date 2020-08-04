using DotNetBlog.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [Area("Api")]
    [Route("api/statistics")]
    [Filters.RequireLoginApiFilter]
    public class StatisticsController : ControllerBase
    {
        private StatisticsService StatisticsService { get; set; }

        public StatisticsController(StatisticsService statisticsService)
        {
            this.StatisticsService = statisticsService;
        }

        [HttpGet("")]
        public async Task<IActionResult> Index()
        {
            var model = await this.StatisticsService.GetBlogStatistics();

            return this.Success(model);
        }
    }
}
