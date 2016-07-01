using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetBlog.Core.Data.Mappings;

namespace DotNetBlog.Core.Data
{
    public class BlogContext : DbContext
    {
        public virtual DbSet<Setting> Settings { get; set; }

        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<CategoryTopic> CategoryTopics { get; set; }

        public virtual DbSet<Topic> Topics { get; set; }

        public BlogContext(DbContextOptions<BlogContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Setting>(SettingMapping.Map);
            modelBuilder.Entity<Category>(CategoryMapping.Map);
            modelBuilder.Entity<CategoryTopic>(CategoryTopicMapping.Map);
            modelBuilder.Entity<Topic>(TopicMapping.Map);
        }
    }
}
