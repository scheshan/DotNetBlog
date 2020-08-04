using DotNetBlog.Core.Model.Category;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class CategoryPageViewModel
    {
        public CategoryModel Category { get; set; }

        public TopicListModel TopicList { get; set; }
    }
}
