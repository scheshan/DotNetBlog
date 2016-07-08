using DotNetBlog.Core.Data;
using DotNetBlog.Core.Model.Tag;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetBlog.Core.Extensions;
using DotNetBlog.Core.Model;

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

        public async Task<PagedResult<TagModel>> Query(int pageIndex, int pageSize, string keywords)
        {
            var query = (await this.All()).AsQueryable();

            if (!string.IsNullOrWhiteSpace(keywords))
            {
                query = query.Where(t => t.Keyword == keywords);
            }

            int total = query.Count();

            var list = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            return new PagedResult<TagModel>(list, total);
        }

        public async Task<TagModel> Get(string keyword)
        {
            return (await All()).FirstOrDefault(t => t.Keyword == keyword);
        }
    }
}
