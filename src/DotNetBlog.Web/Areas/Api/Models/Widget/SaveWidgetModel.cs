using DotNetBlog.Core.Model.Widget;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Widget
{
    public class SaveWidgetModel
    {
        public Core.Enums.WidgetType Type { get; set; }

        [Required]
        public JObject Config { get; set; }
    }
}
