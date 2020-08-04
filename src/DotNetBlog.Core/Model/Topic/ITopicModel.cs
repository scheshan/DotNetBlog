namespace DotNetBlog.Core.Model.Topic
{
    public interface ITopicModel
    {
        int ID { get; }

        string Title { get; }

        string Alias { get; }
    }
}
