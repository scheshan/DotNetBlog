using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Category;
using DotNetBlog.Core.Model.Topic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Web.ViewModels.Home
{
    public class CategoryViewModel
    {
        public CategoryModel Category { get; set; }

        public PagedResult<TopicModel> TopicList { get; set; }
    }
}
