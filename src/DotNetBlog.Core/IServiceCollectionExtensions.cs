using DotNetBlog.Core.Model.Page;
using DotNetBlog.Core.Model.Setting;
using DotNetBlog.Core.Service;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core
{
    public static class IServiceCollectionExtensions
    {
        public static void AddBlogService(this IServiceCollection services)
        {
            services.AddScoped<SettingService>()
                .AddScoped<CategoryService>()
                .AddScoped<TopicService>()
                .AddScoped<TagService>()
                .AddScoped<AuthService>()
                .AddScoped<UserService>()
                .AddScoped<CommentService>()
                .AddScoped<PageService>();

            services.AddScoped<SettingModel>(provider =>
            {
                return provider.GetService<SettingService>().Get();
            });

            services.AddScoped<ClientManager>();
        }
    }
}
