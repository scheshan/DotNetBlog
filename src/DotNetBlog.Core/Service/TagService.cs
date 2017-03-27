using DotNetBlog.Core.Data;
using DotNetBlog.Core.Model.Tag;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetBlog.Core.Extensions;
using DotNetBlog.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Localization;

namespace DotNetBlog.Core.Service
{
    public class TagService
    {
        private BlogContext BlogContext { get; set; }

        private IHtmlLocalizer<TagService> L { get; set; }

        public TagService(BlogContext blogContext, IHtmlLocalizer<TagService> localizer)
        {
            BlogContext = blogContext;
            L = localizer;
        }

        public async Task<List<TagModel>> All()
        {
            var list = BlogContext.QueryAllTagFromCache();
            return await Task.FromResult(list);
        }

        public async Task<PagedResult<TagModel>> Query(int pageIndex, int pageSize, string keywords)
        {
            var query = (await this.All()).AsQueryable();

            if (!string.IsNullOrWhiteSpace(keywords))
            {
                query = query.Where(t => t.Keyword.Contains(keywords));
            }

            int total = query.Count();

            var list = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            return new PagedResult<TagModel>(list, total);
        }

        public async Task<TagModel> Get(string keyword)
        {
            return (await All()).FirstOrDefault(t => t.Keyword == keyword);
        }

        public async Task Delete(int[] idList)
        {
            var entityList = await this.BlogContext.Tags.Where(t => idList.Contains(t.ID)).ToListAsync();
            this.BlogContext.RemoveRange(entityList);
            await this.BlogContext.SaveChangesAsync();

            this.BlogContext.RemoveTagCache();
        }

        public async Task<OperationResult> Edit(int id, string keyword)
        {
            var all = await this.All();
            if (all.Any(t => t.Keyword == keyword && t.ID != id))
            {
                return OperationResult.Failure(L["The label name is duplicated"].Value);
            }

            var entity = await this.BlogContext.Tags.SingleOrDefaultAsync(t => t.ID == id);

            if(entity == null)
            {
                return OperationResult.Failure(L["The label does not exists"].Value);
            }

            entity.Keyword = keyword;
            await this.BlogContext.SaveChangesAsync();

            this.BlogContext.RemoveTagCache();

            return new OperationResult();
        }
    }
}
