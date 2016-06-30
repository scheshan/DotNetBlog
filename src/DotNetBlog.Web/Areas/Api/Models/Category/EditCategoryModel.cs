using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Category
{
    public class EditCategoryModel : AddCategoryModel
    {
        [Required]
        public int? ID { get; set; }
    }
}
