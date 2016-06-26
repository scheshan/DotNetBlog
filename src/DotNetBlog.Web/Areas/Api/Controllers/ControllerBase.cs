using DotNetBlog.Web.Areas.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Controllers
{
    public class ControllerBase : Controller
    {
        private static readonly JsonSerializerSettings _DefaultJsonSerializerSettings;

        static ControllerBase()
        {
            _DefaultJsonSerializerSettings = new JsonSerializerSettings
            {
                DateFormatString = "yyyy-MM-dd HH:mm:ss",
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }
        
        protected IActionResult Success()
        {
            var response = new ApiResponse
            {
                Success = true
            };

            return Json(response);
        }
        
        protected IActionResult Error(string errorMessage)
        {
            var response = new ApiResponse
            {
                ErrorMessage = errorMessage
            };

            return Json(response);
        }

        protected IActionResult Success<T>(T data)
        {
            var response = new ApiResponse<T>
            {
                Success = true,
                Data = data
            };

            return Json(response);
        }
            
        protected new IActionResult Json(object data)
        {
            return base.Json(data, _DefaultJsonSerializerSettings);
        }

        protected IActionResult InvalidRequest()
        {
            string errorMessage;

            if (ModelState.IsValid)
            {
                errorMessage = "错误的请求";
            }
            else
            {
                errorMessage = ModelState.Where(t => t.Value.Errors.Any()).Select(t => t.Value).FirstOrDefault()?.Errors.FirstOrDefault()?.ErrorMessage;
                errorMessage = errorMessage ?? "错误的请求";
            }

            return this.Error(errorMessage);
        }
    }
}
