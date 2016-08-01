using DotNetBlog.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class WidgetService
    {
        public List<WidgetType> GetAvailableWidgetList()
        {
            List<WidgetType> result = new List<WidgetType>();

            var arr = Enum.GetValues(typeof(WidgetType));
            foreach(byte item in arr)
            {
                WidgetType type = (WidgetType)item;
                result.Add(type);
            }

            return result;
        }


    }
}
