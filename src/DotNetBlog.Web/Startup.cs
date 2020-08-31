using DotNetBlog.Core;
using DotNetBlog.Core.Data;
using DotNetBlog.Web.Middlewares;
using DotNetBlog.Web.ViewEngines;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;

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
                        });
                    });
            }

            services.AddBlogService();
            services.AddAutoMapper();

            services.Configure<RequestLocalizationOptions>(
                opts =>
                {
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

                    //Uncomment for change language by user
                    opts.RequestCultureProviders.Insert(0, new CustomRequestCultureProvider(context =>
                    {
                        var settingService = context.RequestServices.GetService<Core.Service.SettingService>();
                        // My custom request culture logic
                        return Task.Run(() => new ProviderCultureResult(settingService.Get().Language));
                    }));
                });

            services.Configure<RazorViewEngineOptions>(options =>
            {
                options.ViewLocationExpanders.Add(new ViewEngines.ThemeViewEngine());
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton<IStringLocalizerFactory, ThemeResourceLocalizationFactory>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IWebHostEnvironment env,
            ILoggerFactory loggerFactory,
            BlogContext blogContext)
        {
            var uploadFolder = env.ContentRootPath + "/App_Data/upload";
            Directory.CreateDirectory(uploadFolder);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            /* Path for static files */
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                RequestPath = new PathString("/upload"),
                FileProvider = new PhysicalFileProvider(uploadFolder)
            });

            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);

            app.UseRouting();
            app.UseClientManager();

            blogContext.Database.EnsureCreated();
            blogContext.Database.Migrate();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "../DotNetBlog.Admin";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
