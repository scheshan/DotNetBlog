using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Model.Setting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class SettingService
    {
        private BlogContext BlogContext { get; set; }

        private IStringLocalizer<SettingModel> SettingModelLocalizer { get; set; }

        private IMemoryCache Cache { get; set; }

        private static readonly string CacheKey = "Cache_Settings";

        private static object _sync = new object();

        public SettingService(BlogContext blogContext, IMemoryCache cache, IStringLocalizer<SettingModel> settingModelLocalizer)
        {
            BlogContext = blogContext;
            Cache = cache;
            SettingModelLocalizer = settingModelLocalizer;
        }

        private List<Setting> All()
        {
            var settings = Cache.Get<List<Setting>>(CacheKey);

            if (settings == null)
            {
                try
                {
                    settings = BlogContext.Settings.ToList();
                }
                catch
                {
                    settings = new List<Entity.Setting>();
                }
                Cache.Set(CacheKey, settings);
            }

            return settings;
        }

        public SettingModel Get()
        {
            var settings = All();
            var dict = settings.ToDictionary(t => t.Key, t => t.Value);
            return new SettingModel(dict, SettingModelLocalizer);
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

                RemoveCache();
            }
        }

        public void RemoveCache()
        {
            Cache.Remove(CacheKey);
        }
    }
}
