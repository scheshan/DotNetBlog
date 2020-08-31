using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class CategoryMapping
    {
        public static void Map(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Category");
            builder.HasKey(t => t.ID);

            builder.Property(t => t.ID).ValueGeneratedOnAdd().UseSqlServerIdentityColumn();
            builder.Property(t => t.Name).IsRequired().HasMaxLength(50);
            builder.Property(t => t.Description).HasMaxLength(200);
        }
    }
}
