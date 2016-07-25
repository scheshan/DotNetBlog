using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Extensions
{
    public static class MemoryCacheExtensions
    {
        public static T RetriveCache<T>(this IMemoryCache cache, string cacheKey, Func<T> func, MemoryCacheEntryOptions options = null)
        {
            var result = cache.Get<T>(cacheKey);

            if (result == null)
            {
                result = func();

                if (options == null)
                {
                    cache.Set(cacheKey, result);
                }
                else
                {
                    cache.Set(cacheKey, result, options);
                }
            }

            return result;
        }

        public static async Task<T> RetriveCacheAsync<T>(this IMemoryCache cache, string cacheKey, Func<Task<T>> func, MemoryCacheEntryOptions options = null)
        {
            var result = cache.Get<T>(cacheKey);

            if (result == null)
            {
                result = await func();

                if (options == null)
                {
                    cache.Set(cacheKey, result);
                }
                else
                {
                    cache.Set(cacheKey, result, options);
                }
            }

            return result;
        }
    }
}
