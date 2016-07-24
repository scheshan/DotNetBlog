using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Comment
{
    public class BatchModel
    {
        [Required]
        public int[] CommentList { get; set; }
    }
}
