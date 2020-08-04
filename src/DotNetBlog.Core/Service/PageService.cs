using AutoMapper;
using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Extensions;
using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Page;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class PageService
    {
        private static readonly string CACHE_KEY = "Cache_Page";
        private readonly IMapper _mapper;

        private BlogContext BlogContext { get; set; }

        private IMemoryCache Cache { get; set; }

        private IHtmlLocalizer<PageService> L { get; set; }


        public PageService(BlogContext blogContext,
            IMemoryCache cache,
            IHtmlLocalizer<PageService> localizer,
            IMapper mapper)
        {
            this.BlogContext = blogContext;
            this.Cache = cache;
            this.L = localizer;
            _mapper = mapper;
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
                    return OperationResult<PageModel>.Failure(L["Selected parent does not exists"].Value);
                }
            }

            model.Alias = await this.GenerateAlias(null, model.Alias, model.Title);

            var entity = _mapper.Map<Page>(model);
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
                return OperationResult<PageModel>.Failure(L["The page does not exists anymore"].Value);
            }

            if (model.Parent.HasValue)
            {
                if (model.Parent.Value == entity.ID)
                {
                    return OperationResult<PageModel>.Failure(L["You cannot set as parent"].Value);
                }

                var parent = await this.BlogContext.Pages.SingleOrDefaultAsync(t => t.ID == model.Parent.Value);

                if (parent == null || parent.ParentID.HasValue)
                {
                    return OperationResult<PageModel>.Failure(L["Parent does not exists"].Value);
                }
            }

            model.Alias = await this.GenerateAlias(model.ID, model.Alias, model.Title);

            _mapper.Map(model, entity);
            entity.EditDate = model.Date ?? DateTime.Now;
            entity.ParentID = model.Parent;

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
                var pageModel = _mapper.Map<PageBasicModel>(entity);

                if (entity.ParentID.HasValue)
                {
                    var parent = entityList.SingleOrDefault(t => t.ID == entity.ParentID.Value);
                    pageModel.Parent = _mapper.Map<PageBasicModel>(parent);
                }

                return pageModel;
            });

            return result.ToList();
        }

        public async Task<List<PageBasicModel>> QueryPublished()
        {
            var entityList = (await this.All()).Where(t => t.Status == Enums.PageStatus.Published);

            var result = entityList.Select(entity =>
            {
                var pageModel = _mapper.Map<PageBasicModel>(entity);

                if (entity.ParentID.HasValue)
                {
                    var parent = entityList.SingleOrDefault(t => t.ID == entity.ParentID.Value);
                    pageModel.Parent = _mapper.Map<PageBasicModel>(parent);
                }

                return pageModel;
            });

            return result.ToList();
        }

        public async Task<PageModel> Get(int id)
        {
            var entity = (await this.All()).SingleOrDefault(t => t.ID == id);
            if (entity == null)
            {
                return null;
            }

            var pageModel = (await this.Transform(entity)).First();

            return pageModel;
        }

        public async Task<PageModel> Get(string alias)
        {
            var entity = (await this.All()).SingleOrDefault(t => t.Alias == alias);
            if (entity == null)
            {
                return null;
            }

            var pageModel = (await this.Transform(entity)).First();

            return pageModel;
        }

        public async Task BatchUpdateStatus(int[] idList, Enums.PageStatus status)
        {
            var pageList = await BlogContext.Pages.Where(t => idList.Contains(t.ID)).ToListAsync();

            pageList.ForEach(page =>
            {
                page.Status = status;
            });

            await BlogContext.SaveChangesAsync();

            this.Cache.Remove(CACHE_KEY);
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
                var pageModel = _mapper.Map<PageModel>(entity);
                if (entity.ParentID.HasValue)
                {
                    var parent = allEntityList.SingleOrDefault(t => t.ID == entity.ParentID.Value);
                    pageModel.Parent = _mapper.Map<PageBasicModel>(parent);
                }

                return pageModel;
            });

            return result.ToList();
        }
    }
}
