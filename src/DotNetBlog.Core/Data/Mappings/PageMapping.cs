using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Data.Mappings
{
    public sealed class PageMapping
    {
        public static void Map(EntityTypeBuilder<Page> builder)
        {
            builder.ToTable("Page");

            builder.HasKey(t => t.ID);

            builder.HasIndex(t => t.Alias).IsUnique();

            builder.Property(t => t.ID).ValueGeneratedOnAdd().UseSqlServerIdentityColumn();
            builder.Property(t => t.Title).IsRequired().HasMaxLength(100);
            builder.Property(t => t.Alias).HasMaxLength(100);
            builder.Property(t => t.Keywords).HasMaxLength(100);
            builder.Property(t => t.Description).HasMaxLength(500);
        }
    }
}
