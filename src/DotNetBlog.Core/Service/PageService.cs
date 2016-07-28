using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Page;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetBlog.Core.Extensions;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace DotNetBlog.Core.Service
{
    public class PageService
    {
        private static readonly string CACHE_KEY = "Cache_Page";

        private BlogContext BlogContext { get; set; }

        private IMemoryCache Cache { get; set; }

        public PageService(BlogContext blogContext, IMemoryCache cache)
        {
            this.BlogContext = blogContext;
            this.Cache = cache;
        }

        public async Task<List<Page>> All()
        {
            var entityList = await this.Cache.RetriveCacheAsync(CACHE_KEY, async () =>
            {
                return await this.BlogContext.Pages.OrderByDescending(t => t.Order).ThenBy(t => t.ID).ToListAsync();
            });

            return entityList;
        }

        public async Task<OperationResult<PageModel>> Add(AddPageModel model)
        {
            if (model.Parent.HasValue)
            {
                var parent = await this.BlogContext.Pages.SingleOrDefaultAsync(t => t.ID == model.Parent.Value);

                if (parent == null || parent.ParentID.HasValue)
                {
                    return OperationResult<PageModel>.Failure("不存在的上级页面");
                }
            }

            model.Alias = await this.GenerateAlias(null, model.Alias, model.Title);
            model.Summary = model.Summary.TrimHtml();
            if (string.IsNullOrWhiteSpace(model.Summary))
            {
                model.Summary = model.Content.TrimHtml().ToLength(200);
            }

            var entity = Mapper.Map<Page>(model);
            entity.CreateDate = DateTime.Now;
            entity.EditDate = model.Date ?? DateTime.Now;

            this.BlogContext.Pages.Add(entity);

            await this.BlogContext.SaveChangesAsync();

            this.Cache.Remove(CACHE_KEY);

            var pageModel = (await this.Transform(entity)).First();

            return new OperationResult<PageModel>(pageModel);
        }

        public async Task<OperationResult<PageModel>> Edit(EditPageModel model)
        {
            var entity = await this.BlogContext.Pages.SingleOrDefaultAsync(t => t.ID == model.ID);

            if (entity == null)
            {
                return OperationResult<PageModel>.Failure("页面不存在");
            }

            if (model.Parent.HasValue)
            {
                if (model.Parent.Value == entity.ID)
                {
                    return OperationResult<PageModel>.Failure("不存在的上级页面");
                }

                var parent = await this.BlogContext.Pages.SingleOrDefaultAsync(t => t.ID == model.Parent.Value);

                if (parent == null || parent.ParentID.HasValue)
                {
                    return OperationResult<PageModel>.Failure("不存在的上级页面");
                }
            }

            model.Alias = await this.GenerateAlias(null, model.Alias, model.Title);
            model.Summary = model.Summary.TrimHtml();
            if (string.IsNullOrWhiteSpace(model.Summary))
            {
                model.Summary = model.Content.TrimHtml().ToLength(200);
            }

            Mapper.Map(entity, model);
            entity.EditDate = model.Date ?? DateTime.Now;

            await this.BlogContext.SaveChangesAsync();

            this.Cache.Remove(CACHE_KEY);

            var pageModel = (await this.Transform(entity)).First();

            return new OperationResult<PageModel>(pageModel);
        }

        public async Task<List<PageBasicModel>> Query()
        {
            var entityList = await this.All();

            var result = entityList.Select(entity =>
            {
                var pageModel = Mapper.Map<PageBasicModel>(entity);

                if (entity.ParentID.HasValue)
                {
                    var parent = entityList.SingleOrDefault(t => t.ID == entity.ParentID.Value);
                    pageModel.Parent = Mapper.Map<PageBasicModel>(parent);
                }

                return pageModel;
            });

            return result.ToList();
        }

        private async Task<string> GenerateAlias(int? id, string alias, string title)
        {
            alias = alias.TrimNotCharater();
            if (string.IsNullOrWhiteSpace(alias))
            {
                alias = title.TrimNotCharater();
            }

            var query = this.BlogContext.Pages.Where(t => t.Alias == alias);
            if (id.HasValue)
            {
                query = query.Where(t => t.ID != id.Value);
            }

            if (await query.AnyAsync())
            {
                alias = string.Empty;
            }

            return alias;
        }

        private async Task<List<PageModel>> Transform(params Page[] entityList)
        {
            var allEntityList = await this.All();

            var result = entityList.Select(entity =>
            {
                var pageModel = Mapper.Map<PageModel>(entity);
                if (entity.ParentID.HasValue)
                {
                    var parent = allEntityList.SingleOrDefault(t => t.ID == entity.ParentID.Value);
                    pageModel.Parent = Mapper.Map<PageBasicModel>(parent);
                }

                return pageModel;
            });

            return result.ToList();
        }
    }
}
