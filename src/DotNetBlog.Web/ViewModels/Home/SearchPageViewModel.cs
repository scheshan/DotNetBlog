using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class SearchPageViewModel
    {
        public string Keywords { get; set; }

        public TopicListModel TopicList { get; set; }
    }
}
