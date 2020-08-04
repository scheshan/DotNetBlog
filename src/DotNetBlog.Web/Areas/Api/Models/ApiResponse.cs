using System.Collections.Generic;

namespace DotNetBlog.Web.Areas.Api.Models
{
    public class ApiResponse
    {
        public bool Success { get; set; }

        public string ErrorMessage { get; set; }
    }

    public class ApiResponse<T> : ApiResponse
    {
        public T Data { get; set; }
    }

    public class PagedApiResponse<T> : ApiResponse
    {
        public List<T> Data { get; set; }

        public int Total { get; set; }
    }
}
