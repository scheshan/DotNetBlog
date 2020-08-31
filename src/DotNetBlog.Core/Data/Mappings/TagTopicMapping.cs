using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class TagTopicMapping
    {
        public static void Map(EntityTypeBuilder<TagTopic> builder)
        {
            builder.ToTable("TagTopic");

            builder.HasKey(t => new { t.TagID, t.TopicID });
            builder.HasOne(t => t.Topic).WithMany();
            builder.HasOne(t => t.Tag).WithMany();
        }
    }
}
