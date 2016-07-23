using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class TagPageViewModel
    {
        public string Tag { get; set; }

        public TopicListModel TopicList { get; set; }
    }
}
