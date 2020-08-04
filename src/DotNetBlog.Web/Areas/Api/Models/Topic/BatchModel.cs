using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.Areas.Api.Models.Topic
{
    public class BatchModel
    {
        [Required]
        public int[] TopicList { get; set; }
    }
}
