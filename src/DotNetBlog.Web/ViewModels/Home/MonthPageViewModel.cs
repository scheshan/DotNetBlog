using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class MonthPageViewModel
    {
        public int Year { get; set; }

        public int Month { get; set; }

        public TopicListModel TopicList { get; set; }
    }
}
