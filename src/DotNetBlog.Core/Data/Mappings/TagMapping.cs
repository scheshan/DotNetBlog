using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class TagMapping
    {
        public static void Map(EntityTypeBuilder<Tag> builder)
        {
            builder.ToTable("Tag").HasAlternateKey(t => t.Keyword);

            builder.HasKey(t => t.ID);
            builder.Property(t => t.ID).ValueGeneratedOnAdd().UseSqlServerIdentityColumn();
            builder.Property(t => t.Keyword).IsRequired().HasMaxLength(100);
        }
    }
}
