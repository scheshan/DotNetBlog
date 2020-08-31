using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class CategoryTopicMapping
    {
        public static void Map(EntityTypeBuilder<CategoryTopic> builder)
        {
            builder.ToTable("CategoryTopic");

            builder.HasKey(t => new { t.CategoryID, t.TopicID });
            builder.HasOne(t => t.Category).WithMany();
            builder.HasOne(t => t.Topic).WithMany();
        }
    }
}
