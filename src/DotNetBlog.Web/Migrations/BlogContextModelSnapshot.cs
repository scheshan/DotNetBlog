using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using DotNetBlog.Core.Data;

namespace DotNetBlog.Web.Migrations
{
    [DbContext(typeof(BlogContext))]
    partial class BlogContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431");

            modelBuilder.Entity("DotNetBlog.Core.Entity.Category", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.HasKey("ID");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("DotNetBlog.Core.Entity.CategoryTopic", b =>
                {
                    b.Property<int>("CategoryID");

                    b.Property<int>("TopicID");

                    b.HasKey("CategoryID", "TopicID");

                    b.HasIndex("CategoryID");

                    b.ToTable("CategoryTopic");
                });

            modelBuilder.Entity("DotNetBlog.Core.Entity.Setting", b =>
                {
                    b.Property<string>("Key")
                        .HasAnnotation("MaxLength", 50);

                    b.Property<string>("Value")
                        .IsRequired();

                    b.HasKey("Key");

                    b.ToTable("Setting");
                });

            modelBuilder.Entity("DotNetBlog.Core.Entity.CategoryTopic", b =>
                {
                    b.HasOne("DotNetBlog.Core.Entity.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
