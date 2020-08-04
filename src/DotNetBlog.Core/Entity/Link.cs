namespace DotNetBlog.Core.Entity
{
    public class Link
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public int Sort { get; set; }

        public string OpenInNewWindow { get; set; }
    }
}
