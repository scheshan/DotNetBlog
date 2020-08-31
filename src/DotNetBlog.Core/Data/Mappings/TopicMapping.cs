using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class TopicMapping
    {
        public static void Map(EntityTypeBuilder<Topic> builder)
        {
            builder.ToTable("Topic");

            builder.HasKey(t => t.ID);

            builder.HasIndex(t => t.Alias).IsUnique();

            builder.Property(t => t.ID).ValueGeneratedOnAdd().UseSqlServerIdentityColumn();
            builder.Property(t => t.Title).IsRequired().HasMaxLength(100);
            builder.Property(t => t.Alias).HasMaxLength(100);
            builder.Property(t => t.Summary).HasMaxLength(200);
        }
    }
}
