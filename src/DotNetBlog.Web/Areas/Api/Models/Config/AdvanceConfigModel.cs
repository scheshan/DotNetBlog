using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Config
{
    public class AdvanceConfigModel
    {
        [Required]
        public string ErrorPageTitle { get; set; }

        [Required]
        public string ErrorPageContent { get; set; }

        public string HeaderScript { get; set; }

        public string FooterScript { get; set; }
    }
}
