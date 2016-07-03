using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.EntityFrameworkCore;
using DotNetBlog.Core.Model.Category;

namespace DotNetBlog.Core.Extensions
{
    public static class BlogContextExtensions
    {
        private static readonly string CacheKey_Category = "Cache_Category";

        public static async Task<List<CategoryModel>> QueryAllCategoryFromCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();

            var list = cache.Get<List<CategoryModel>>(CacheKey_Category);
            if (list == null)
            {
                List<Category> entityList = await context.Categories.ToListAsync();

                var categoryTopics = context.CategoryTopics.Include(ct => ct.Topic)
                                    .GroupBy(ct => ct.CategoryID)
                                    .Select(ct => new
                                    {
                                        ID = ct.Key,
                                        Total = ct.Count(),
                                        Published = ct.Count(t => t.Topic.Status == Enums.TopicStatus.Published),
                                        Deleted = ct.Count(t => t.Topic.Status == Enums.TopicStatus.Trash)
                                    });

                var query = from entity in entityList
                            join ct in categoryTopics on entity.ID equals ct.ID into temp
                            from ct in temp.DefaultIfEmpty()
                            select new CategoryModel
                            {
                                ID = entity.ID,
                                Name = entity.Name,
                                Description = entity.Description,
                                Topics = new CategoryModel.TopicCount
                                {
                                    All = ct != null ? ct.Total : 0,
                                    Deleted = ct != null ? ct.Deleted : 0,
                                    Published = ct != null ? ct.Published : 0
                                }
                            };

                list = query.ToList();
                cache.Set(CacheKey_Category, list);
            }

            return list;
        }

        public static void RemoveCategoryCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();
            cache.Remove(CacheKey_Category);
        }
    }
}
