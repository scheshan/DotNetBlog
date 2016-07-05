using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class CommentMapping
    {
        public static void Map(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Comment");

            builder.HasKey(t => t.ID);

            builder.Property(t => t.ID).ValueGeneratedOnAdd().UseSqlServerIdentityColumn();

            builder.Property(t => t.Content).IsRequired();
            builder.Property(t => t.CreateIP).IsRequired().HasMaxLength(40);
            builder.Property(t => t.Email).IsRequired().HasMaxLength(100);
            builder.Property(t => t.Name).IsRequired().HasMaxLength(20);
            builder.Property(t => t.WebSite).HasMaxLength(100);
        }
    }
}
