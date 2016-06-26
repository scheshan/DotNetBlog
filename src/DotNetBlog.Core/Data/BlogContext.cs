using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Data
{
    public class BlogContext : DbContext
    {
        public virtual DbSet<Setting> Settings { get; set; }

        public BlogContext(DbContextOptions<BlogContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Setting>(Mappings.SettingMapping.Map);
        }
    }
}
