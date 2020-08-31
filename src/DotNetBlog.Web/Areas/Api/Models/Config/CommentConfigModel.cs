namespace DotNetBlog.Web.Areas.Api.Models.Config
{
    public class CommentConfigModel
    {
        public bool AllowComment { get; set; }

        public bool VerifyComment { get; set; }

        public bool TrustAuthenticatedCommentUser { get; set; }

        public bool EnableCommentWebSite { get; set; }

        public int CloseCommentDays { get; set; }
    }
}
