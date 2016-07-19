using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Web.ViewModels.Home
{
    public class AddCommentModel
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Content { get; set; }

        public bool NotifyOnComment { get; set; }

        public string WebSite { get; set; }

        public int? ReplyTo { get; set; }
    }
}
