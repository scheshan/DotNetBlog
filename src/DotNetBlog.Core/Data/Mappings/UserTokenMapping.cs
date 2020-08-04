using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotNetBlog.Core.Data.Mappings
{
    public sealed class UserTokenMapping
    {
        public static void Map(EntityTypeBuilder<UserToken> builder)
        {
            builder.ToTable("UserToken");

            builder.HasKey(t => t.Token);

            builder.Property(t => t.Token).HasMaxLength(32);
        }
    }
}
