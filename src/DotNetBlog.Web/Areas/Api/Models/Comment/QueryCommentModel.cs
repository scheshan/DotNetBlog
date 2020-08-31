namespace DotNetBlog.Web.Areas.Api.Models.Comment
{
    public class QueryCommentModel
    {
        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public Core.Enums.CommentStatus? Status { get; set; }

        public string Keywords { get; set; }
    }
}
