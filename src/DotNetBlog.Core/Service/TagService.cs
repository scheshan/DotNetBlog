using DotNetBlog.Core.Data;
using DotNetBlog.Core.Model.Tag;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetBlog.Core.Extensions;

namespace DotNetBlog.Core.Service
{
    public class TagService
    {
        private BlogContext BlogContext { get; set; }

        public TagService(BlogContext blogContext)
        {
            BlogContext = blogContext;
        }

        public async Task<List<TagModel>> All()
        {
            return await BlogContext.QueryAllTagFromCache();
        }

        public async Task<TagModel> Get(string keyword)
        {
            return (await All()).FirstOrDefault(t => t.Keyword == keyword);
        }
    }
}
