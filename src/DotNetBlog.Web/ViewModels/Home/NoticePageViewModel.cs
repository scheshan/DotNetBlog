namespace DotNetBlog.Web.ViewModels.Home
{
    public class NoticePageViewModel
    {
        public string Message { get; set; }

        public string RedirectUrl { get; set; }

        public NoticeMessageType MessageType { get; set; }

        public enum NoticeMessageType
        {
            Success = 1,
            Error = 2,
            Info = 3
        }
    }
}
