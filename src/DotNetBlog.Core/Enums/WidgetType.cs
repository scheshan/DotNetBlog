using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Enums
{
    public enum WidgetType : byte
    {
        Administrator = 1,

        Category = 2,

        Tag = 3,

        RecentTopic = 4,

        RecentComment = 5,

        MonthStatistice = 6,

        Page = 7,

        Search = 8,

        //Link = 9
    }
}
