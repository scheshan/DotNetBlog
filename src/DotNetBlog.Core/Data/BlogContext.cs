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

        public virtual DbSet<Tag> Tags { get; set; }

        public virtual DbSet<TagTopic> TagTopics { get; set; }

        public virtual DbSet<Comment> Comments { get; set; }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<UserToken> UserTokens { get; set; }

        public virtual DbSet<Page> Pages { get; set; }

        public virtual DbSet<Widget> Widgets { get; set; }

        public IServiceProvider ServiceProvider { get; private set; }

        public BlogContext(DbContextOptions<BlogContext> options, IServiceProvider serviceProvider)
            : base(options)
        {
            ServiceProvider = serviceProvider;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Setting>(SettingMapping.Map);
            modelBuilder.Entity<Category>(CategoryMapping.Map);
            modelBuilder.Entity<CategoryTopic>(CategoryTopicMapping.Map);
            modelBuilder.Entity<Topic>(TopicMapping.Map);
            modelBuilder.Entity<Tag>(TagMapping.Map);
            modelBuilder.Entity<TagTopic>(TagTopicMapping.Map);
            modelBuilder.Entity<Comment>(CommentMapping.Map);
            modelBuilder.Entity<User>(UserMapping.Map);
            modelBuilder.Entity<UserToken>(UserTokenMapping.Map);
            modelBuilder.Entity<Page>(PageMapping.Map);
            modelBuilder.Entity<Widget>(WidgetMapping.Map);
        }
    }
}
