using DotNetBlog.Core.Model.Widget;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Widget
{
    public class SaveWidgetModel
    {
        [Required]
        public List<WidgetModel> WidgetList { get; set; }
    }
}
