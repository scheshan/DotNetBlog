using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Enums
{
    public enum TopicStatus : byte
    {
        Normal = 0,
        Published = 1,
        Draft = 100,
        Trash = 255
    }
}
