using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using DotNetBlog.Core.Data;

namespace DotNetBlog.Web.Migrations
{
    [DbContext(typeof(BlogContext))]
    [Migration("20160702011303_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.HasIndex("TopicID");

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

            modelBuilder.Entity("DotNetBlog.Core.Entity.Tag", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Keyword")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 100);

                    b.HasKey("ID");

                    b.ToTable("Tag");
                });

            modelBuilder.Entity("DotNetBlog.Core.Entity.TagTopic", b =>
                {
                    b.Property<int>("TagID");

                    b.Property<int>("TopicID");

                    b.HasKey("TagID", "TopicID");

                    b.HasIndex("TagID");

                    b.HasIndex("TopicID");

                    b.ToTable("TagTopic");
                });

            modelBuilder.Entity("DotNetBlog.Core.Entity.Topic", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Alias")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<bool>("AllowComment");

                    b.Property<string>("Content");

                    b.Property<DateTime>("CreateDate");

                    b.Property<int>("CreateUserID");

                    b.Property<DateTime>("EditDate");

                    b.Property<int>("EditUserID");

                    b.Property<byte>("Status");

                    b.Property<string>("Summary")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 100);

                    b.HasKey("ID");

                    b.ToTable("Topic");
                });

            modelBuilder.Entity("DotNetBlog.Core.Entity.CategoryTopic", b =>
                {
                    b.HasOne("DotNetBlog.Core.Entity.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DotNetBlog.Core.Entity.Topic", "Topic")
                        .WithMany()
                        .HasForeignKey("TopicID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DotNetBlog.Core.Entity.TagTopic", b =>
                {
                    b.HasOne("DotNetBlog.Core.Entity.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DotNetBlog.Core.Entity.Topic", "Topic")
                        .WithMany()
                        .HasForeignKey("TopicID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
