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

namespace DotNetBlog.Web
{
    public class Startup
    {
        private IConfiguration Configuration { get; set; }

        public Startup()
        {
            this.Configuration = new ConfigurationBuilder()
                .AddJsonFile("App_Data/config.json")
                .Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(this.Configuration);
            services.AddMvc();
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

            services.AddBlogService();

            AutoMapperConfig.Configure();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment enviroment, ILoggerFactory loggerFactory)
        {
            app.UseStaticFiles();

            app.UseDeveloperExceptionPage();
            app.UseMvc();

            loggerFactory.AddNLog();
            enviroment.ConfigureNLog("App_Data/NLog.config");

            using (var context = app.ApplicationServices.GetService<Core.Data.BlogContext>())
            {
                if (context.Database.EnsureCreated())
                {
                    this.InitDatabase();
                }
            }
        }

        private void InitDatabase()
        {

        }
    }
}
