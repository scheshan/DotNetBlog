using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class SettingMapping
    {
        public static void Map(EntityTypeBuilder<Setting> builder)
        {
            builder.ToTable("Setting");

            builder.HasKey(t => t.Key);

            builder.Property(t => t.Key).HasMaxLength(50);
            builder.Property(t => t.Value).IsRequired();
        }
    }
}
