using DotNetBlog.Web.Areas.Api.Filters;
using DotNetBlog.Web.Areas.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    [ErrorHandlerFilter]
    [RequireLoginApiFilter]
    [ValidateRequestApiFilter]
    public class ControllerBase : Controller
    {
        private static readonly JsonSerializerOptions _DefaultJsonSerializerSettings;

        IHtmlLocalizer<ControllerBase> localizer;
        private IHtmlLocalizer<ControllerBase> L
        {
            get
            {
                if (localizer == null)
                {
                    localizer = this.HttpContext.RequestServices.GetService(typeof(IHtmlLocalizer<ControllerBase>)) as IHtmlLocalizer<ControllerBase>;
                }
                return localizer;
            }
        }

        static ControllerBase()
        {
            _DefaultJsonSerializerSettings = new JsonSerializerOptions
            {
                //DateFormatString = "yyyy-MM-dd HH:mm:ss",
                //ContractResolver = new CamelCasePropertyNamesContractResolver()
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,

            };
        }

        [NonAction]
        public IActionResult Success()
        {
            var response = new ApiResponse
            {
                Success = true
            };

            return Json(response);
        }

        [NonAction]
        public IActionResult Error(string errorMessage)
        {
            var response = new ApiResponse
            {
                ErrorMessage = errorMessage
            };

            return Json(response);
        }

        [NonAction]
        public IActionResult Success<T>(T data)
        {
            var response = new ApiResponse<T>
            {
                Success = true,
                Data = data
            };

            return Json(response);
        }

        [NonAction]
        public IActionResult PagedData<T>(List<T> data, int total)
        {
            var response = new PagedApiResponse<T>
            {
                Success = true,
                Data = data,
                Total = total
            };

            return Json(response);
        }

        [NonAction]
        public new IActionResult Json(object data)
        {
            return base.Json(data, _DefaultJsonSerializerSettings);
        }

        [NonAction]
        public IActionResult InvalidRequest()
        {
            string errorMessage;

            if (ModelState.IsValid)
            {
                errorMessage = L["Bad request"].Value;
            }
            else
            {
                errorMessage = ModelState.Where(t => t.Value.Errors.Any()).Select(t => t.Value).FirstOrDefault()?.Errors.FirstOrDefault()?.ErrorMessage;
            }

            errorMessage = string.IsNullOrWhiteSpace(errorMessage) ? L["Bad request"].Value : errorMessage;

            return this.Error(errorMessage);
        }
    }
}
