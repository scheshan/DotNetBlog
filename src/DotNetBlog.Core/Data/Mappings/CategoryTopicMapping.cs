using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Data.Mappings
{
    public static class CategoryTopicMapping
    {
        public static void Map(EntityTypeBuilder<CategoryTopic> builder)
        {
            builder.ToTable("CategoryTopic");

            builder.HasKey(t => new { t.CategoryID, t.TopicID });
            builder.HasOne(t => t.Category).WithMany().HasForeignKey(t => t.CategoryID);
        }
    }
}
