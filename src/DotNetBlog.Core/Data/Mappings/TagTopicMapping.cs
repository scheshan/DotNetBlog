using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
