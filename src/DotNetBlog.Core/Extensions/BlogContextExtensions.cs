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
using DotNetBlog.Core.Model.Tag;
using DotNetBlog.Core.Model.Topic;

namespace DotNetBlog.Core.Extensions
{
    public static class BlogContextExtensions
    {
        private static readonly string CacheKey_Category = "Cache_Category";

        private static readonly string CacheKey_Tag = "Cache_Tag";

        private static readonly string CacheKey_MonthStatistics = "Cache_MonthStatistics";

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
                                Topics = new TopicCountModel
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

        public static async Task<List<TagModel>> QueryAllTagFromCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();

            var list = cache.Get<List<TagModel>>(CacheKey_Tag);
            if (list == null)
            {
                var entityList = await context.Tags.ToListAsync();

                var tagTopics = context.TagTopics.Include(ct => ct.Topic)
                                .GroupBy(ct => ct.TagID)
                                .Select(ct => new
                                {
                                    ID = ct.Key,
                                    Total = ct.Count(),
                                    Published = ct.Count(t => t.Topic.Status == Enums.TopicStatus.Published),
                                    Deleted = ct.Count(t => t.Topic.Status == Enums.TopicStatus.Trash)
                                });

                var query = from entity in entityList
                            join tt in tagTopics on entity.ID equals tt.ID into temp
                            from tt in temp.DefaultIfEmpty()
                            select new TagModel
                            {
                                ID = entity.ID,
                                Keyword = entity.Keyword,
                                Topics = new TopicCountModel
                                {
                                    All = tt != null ? tt.Total : 0,
                                    Deleted = tt != null ? tt.Deleted : 0,
                                    Published = tt != null ? tt.Published : 0
                                }
                            };

                list = query.ToList();
                cache.Set(CacheKey_Tag, list);
            }

            return list;
        }

        public static async Task<List<MonthStatisticsModel>> QueryMonthStatisticsFromCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();

            var list = cache.Get<List<MonthStatisticsModel>>(CacheKey_MonthStatistics);
            if(list == null)
            {
                var topicList = await context.Topics.ToListAsync();

                var query = topicList.GroupBy(g => new { g.EditDate.Year, g.EditDate.Month })
                    .Select(g => new MonthStatisticsModel
                    {
                        Month = new DateTime(g.Key.Year, g.Key.Month, 1),
                        Topics = new TopicCountModel
                        {
                            All = g.Count(),
                            Published = g.Count(topic => topic.Status == Enums.TopicStatus.Published),
                            Deleted = g.Count(topic => topic.Status == Enums.TopicStatus.Trash)
                        }
                    });

                list = query.ToList();
                cache.Set(CacheKey_MonthStatistics, list, DateTime.Now.AddMinutes(20));
            }

            return list;
        }

        public static void RemoveCategoryCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();
            cache.Remove(CacheKey_Category);
        }

        public static void RemoveTagCache(this BlogContext context)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();
            cache.Remove(CacheKey_Tag);
        }
    }
}
