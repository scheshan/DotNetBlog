using DotNetBlog.Core.Model.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class CategoryPageViewModel
    {
        public CategoryModel Category { get; set; }

        public TopicListModel TopicList { get; set; }
    }
}
