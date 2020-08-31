using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class TagMapping
    {
        public static void Map(EntityTypeBuilder<Tag> builder)
        {
            builder.ToTable("Tag");

            builder.HasIndex(t => t.Keyword).IsUnique();

            builder.HasKey(t => t.ID);
            builder.Property(t => t.ID).ValueGeneratedOnAdd().UseSqlServerIdentityColumn();
            builder.Property(t => t.Keyword).IsRequired().HasMaxLength(100);
        }
    }
}
