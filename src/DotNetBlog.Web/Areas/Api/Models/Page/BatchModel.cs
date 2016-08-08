using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Page
{
    public class BatchModel
    {
        [Required]
        public int[] PageList { get; set; }
    }
}
