using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Extensions
{
    public static class BlogContextExtensions
    {
        private static readonly string CacheKey_Category = "Cache_Category";

        private static readonly string CacheKey_CategoryTopic = "Cache_CategoryTopic";

        public static async Task<List<Category>> QueryAllCategoryFromCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();

            var list = cache.Get<List<Category>>(CacheKey_Category);
            if (list == null)
            {
                list = await context.Categories.ToListAsync();
                cache.Set(CacheKey_Category, list);
            }

            return list;
        }

        public static async Task<List<CategoryTopic>> QueryAllCategoryTopicFromCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();

            var list = cache.Get<List<CategoryTopic>>(CacheKey_CategoryTopic);
            if (list == null)
            {
                list = await context.CategoryTopics.ToListAsync();
                cache.Set(CacheKey_CategoryTopic, list);
            }

            return list;
        }

        public static void RemoveCategoryCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();
            cache.Remove(CacheKey_Category);
        }

        public static void RemoveCategoryTopicCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();
            cache.Remove(CacheKey_CategoryTopic);
        }
    }
}
