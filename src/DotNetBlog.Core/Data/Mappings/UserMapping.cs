using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Data.Mappings
{
    public sealed class UserMapping
    {
        public static void Map(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");

            builder.HasIndex(t => t.UserName).IsUnique();

            builder.HasKey(t => t.ID);

            builder.Property(t => t.UserName).IsRequired().HasMaxLength(20);
            builder.Property(t => t.Password).IsRequired().HasMaxLength(32);
            builder.Property(t => t.Nickname).IsRequired().HasMaxLength(20);
            builder.Property(t => t.Email).HasMaxLength(100);
            builder.Property(t => t.Avatar).HasMaxLength(100);
        }
    }
}
