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

        private static readonly string CacheKey_User = "Cache_User";

        private static readonly string CacheKey_UserToken = "Cache_UserToken";

        public static List<CategoryModel> QueryAllCategoryFromCache(this BlogContext context)
        {
            var result = RetriveCache(context, CacheKey_Category, () =>
            {
                List<Category> entityList = context.Categories.ToList();

                var categoryTopics = context.CategoryTopics.Include(ct => ct.Topic)
                                    .GroupBy(ct => ct.CategoryID)
                                    .Select(ct => new
                                    {
                                        ID = ct.Key,
                                        Total = ct.Count(),
                                        Published = ct.Count(t => t.Topic.Status == Enums.TopicStatus.Published),
                                        Deleted = ct.Count(t => t.Topic.Status == Enums.TopicStatus.Trash)
                                    })
                                    .ToList();

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

                return query.ToList();
            });

            return result;
        }

        public static List<TagModel> QueryAllTagFromCache(this BlogContext context)
        {
            var result = RetriveCache(context, CacheKey_Tag, () =>
            {
                var entityList = context.Tags.ToList();

                var tagTopics = context.TagTopics.Include(ct => ct.Topic)
                                .GroupBy(ct => ct.TagID)
                                .Select(ct => new
                                {
                                    ID = ct.Key,
                                    Total = ct.Count(),
                                    Published = ct.Count(t => t.Topic.Status == Enums.TopicStatus.Published),
                                    Deleted = ct.Count(t => t.Topic.Status == Enums.TopicStatus.Trash)
                                })
                                .ToList();

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

                return query.ToList();
            });

            return result;
        }

        public static List<MonthStatisticsModel> QueryMonthStatisticsFromCache(this BlogContext context)
        {
            var result = RetriveCache(context, CacheKey_MonthStatistics, () =>
            {
                var topicList = context.Topics.ToList();

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

                return query.ToList();
            }, new MemoryCacheEntryOptions { AbsoluteExpiration = DateTime.Now.AddMinutes(20) });

            return result;
        }

        public static Dictionary<string, UserToken> QueryUserTokenFromCache(this BlogContext context)
        {
            var result = RetriveCache(context, CacheKey_UserToken, () =>
            {
                return context.UserTokens.ToDictionary(t => t.Token);
            });

            return result;
        }

        public static List<User> QueryUserFromCache(this BlogContext context)
        {
            var result = RetriveCache(context, CacheKey_User, () =>
            {
                return context.Users.ToList();
            });

            return result;
        }

        public static void RemoveCategoryCache(this BlogContext context)
        {
            RemoveCache(context, CacheKey_Category);
        }

        public static void RemoveTagCache(this BlogContext context)
        {
            RemoveCache(context, CacheKey_Tag);
        }

        public static void RemoveUserTokenCache(this BlogContext context)
        {
            RemoveCache(context, CacheKey_UserToken);
        }

        public static void RemoveUserCache(this BlogContext context)
        {
            RemoveCache(context, CacheKey_User);
        }

        #region private static methods

        private static T RetriveCache<T>(BlogContext context, string cacheKey, Func<T> func, MemoryCacheEntryOptions options = null)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();
            return cache.RetriveCache<T>(cacheKey, func, options);
        }

        private static void RemoveCache(BlogContext context, string cacheKey)
        {
            var cache = context.ServiceProvider.GetService<IMemoryCache>();
            cache.Remove(cacheKey);
        }

        #endregion
    }
}
