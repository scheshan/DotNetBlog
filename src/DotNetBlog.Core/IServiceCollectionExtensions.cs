using DotNetBlog.Core.Model.Page;
using DotNetBlog.Core.Model.Setting;
using DotNetBlog.Core.Service;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;

namespace DotNetBlog.Core
{
    public static class IServiceCollectionExtensions
    {
        public static void AddBlogService(this IServiceCollection services)
        {
            var assembly = typeof(IServiceCollectionExtensions).GetTypeInfo().Assembly;
            var serviceList = assembly.DefinedTypes.Where(t => t.Name.EndsWith("Service") && t.Namespace == "DotNetBlog.Core.Service").ToList();
            foreach (var service in serviceList)
            {
                services.AddScoped(service.AsType());
            }

            services.AddScoped<SettingModel>(provider =>
            {
                return provider.GetService<SettingService>().Get();
            });

            services.AddScoped<ClientManager>();
        }
    }
}
