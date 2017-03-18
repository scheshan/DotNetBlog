using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using DotNetBlog.Core;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using DotNetBlog.Web.Middlewares;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Options;

namespace DotNetBlog.Web
{
    public class Startup
    {
        private IConfiguration Configuration { get; set; }

        public Startup()
        {
            this.Configuration = new ConfigurationBuilder()
                .AddJsonFile("config.json", false, true)
                .Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLocalization(opts => { opts.ResourcesPath = "Resources"; });

            services.AddSingleton(this.Configuration);
            services.AddMvc()
                .AddViewLocalization(
                    LanguageViewLocationExpanderFormat.Suffix,
                    opts => { opts.ResourcesPath = "Resources"; })
                .AddDataAnnotationsLocalization();

            services.AddMemoryCache();

            string database = this.Configuration["database"];
            if ("sqlite".Equals(database, StringComparison.CurrentCultureIgnoreCase))
            {
                services.AddEntityFrameworkSqlite()
                    .AddDbContext<Core.Data.BlogContext>(opt =>
                    {
                        opt.UseSqlite(this.Configuration["connectionString"], builder => { builder.MigrationsAssembly("DotNetBlog.Web"); });
                    });
            }
            else if ("sqlserver".Equals(database, StringComparison.CurrentCultureIgnoreCase))
            {
                services.AddEntityFrameworkSqlServer()
                    .AddDbContext<Core.Data.BlogContext>(opt =>
                    {
                        opt.UseSqlServer(this.Configuration["connectionString"], builder =>
                        {
                            builder.MigrationsAssembly("DotNetBlog.Web");
                            builder.UseRowNumberForPaging();
                        });
                    });
            }

            services.AddBlogService();

            AutoMapperConfig.Configure();

            services.Configure<RequestLocalizationOptions>(
                opts => {
                    var supportedCultures = new List<CultureInfo>
                    {
                        new CultureInfo("en-GB"),
                        new CultureInfo("zh-CN")
                    };

                    opts.DefaultRequestCulture = new RequestCulture("en-GB");
                    // Formatting numbers, dates, etc.
                    opts.SupportedCultures = supportedCultures;
                    // UI strings that we have localized.
                    opts.SupportedUICultures = supportedCultures;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment enviroment, ILoggerFactory loggerFactory)
        {
            string uploadFolder = enviroment.ContentRootPath + "/App_Data/upload";
            Directory.CreateDirectory(uploadFolder);
            if (enviroment.IsDevelopment())
            {
                string databaseFolder = enviroment.ContentRootPath + "/bin/Debug/netcoreapp1.1/App_Data";
                Directory.CreateDirectory(databaseFolder);
            }

            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);

            /* Path for static files */
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                RequestPath = new PathString("/upload"),
                FileProvider = new PhysicalFileProvider(uploadFolder)
            });

            /* Error page manager */
            if (enviroment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler("/exception/500");
            app.UseStatusCodePagesWithReExecute("/exception/{0}");

            app.UseClientManager();

            app.UseMvc();

            loggerFactory.AddNLog();
            loggerFactory.ConfigureNLog("NLog.config");

        }

        private void InitDatabase()
        {

        }
    }
}
