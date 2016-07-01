using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class TopicMapping
    {
        public static void Map(EntityTypeBuilder<Topic> builder)
        {
            builder.ToTable("Topic");

            builder.HasKey(t => t.ID);

            builder.Property(t => t.ID).ValueGeneratedOnAdd();
            builder.Property(t => t.Title).IsRequired().HasMaxLength(100);
            builder.Property(t => t.Alias).HasMaxLength(100);
            builder.Property(t => t.Summary).HasMaxLength(200);
        }
    }
}
