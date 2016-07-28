using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Page
{
    public class PageModel : PageBasicModel
    {
        public string Content { get; set; }

        public string Keywords { get; set; }

        public string Summary { get; set; }
    }
}
