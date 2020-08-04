namespace DotNetBlog.Core.Enums
{
    public enum CommentStatus : byte
    {
        Pending = 0,

        Approved = 1,

        Reject = 2,

        Junk = 255
    }
}
