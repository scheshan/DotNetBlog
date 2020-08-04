using Microsoft.AspNetCore.Mvc;

namespace DotNetBlog.Web.Controllers
{
    [Route("admin")]
    [Filters.RequireLoginFilter]
    [Filters.ErrorHandleFilter]
    public class AdminController : Controller
    {
        [Route("{*path}")]
        public IActionResult Index()
        {
            return this.View();
        }
    }
}
