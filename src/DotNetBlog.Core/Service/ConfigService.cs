﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using DotNetBlog.Core.Data;
using Microsoft.Extensions.Caching.Memory;
using DotNetBlog.Core.Model.Setting;
using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Service
{
    public class ConfigService
    {
        private BlogContext BlogContext { get; set; }

        private IMemoryCache Cache { get; set; }

        private static readonly string CacheKey = "Cache_Settings";

        private static object _sync = new object();

        public ConfigService(BlogContext blogContext, IMemoryCache cache)
        {
            BlogContext = blogContext;
            Cache = cache;
        }

        private async Task<List<Setting>> All()
        {
            var settings = Cache.Get<List<Setting>>(CacheKey);

            if (settings == null)
            {
                settings = await BlogContext.Settings.ToListAsync();
                Cache.Set(CacheKey, settings);
            }

            return settings;
        }

        public async Task<SettingModel> Get()
        {
            var settings = await All();
            var dict = settings.ToDictionary(t => t.Key, t => t.Value);
            return new SettingModel(dict);
        }

        public async Task Save(SettingModel model)
        {
            using (var tran = await BlogContext.Database.BeginTransactionAsync())
            {
                var settings = await BlogContext.Settings.ToListAsync();
                BlogContext.RemoveRange(settings);
                await BlogContext.SaveChangesAsync();

                var entityList = model.Settings.Select(t => new Setting
                {
                    Key = t.Key,
                    Value = t.Value
                });
                BlogContext.AddRange(entityList);

                await BlogContext.SaveChangesAsync();

                tran.Commit();

                Cache.Remove(CacheKey);
            }
        }
    }
}
