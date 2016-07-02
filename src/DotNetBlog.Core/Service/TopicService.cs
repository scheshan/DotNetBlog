using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Topic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetBlog.Core.Extensions;
using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using Microsoft.EntityFrameworkCore;

namespace DotNetBlog.Core.Service
{
    public class TopicService
    {
        private BlogContext BlogContext { get; set; }

        public TopicService(BlogContext blogContext)
        {
            BlogContext = blogContext;
        }

        public async Task<OperationResult<int>> Add(string title, string content, Enums.TopicStatus status = Enums.TopicStatus.Normal, int[] categoryList = null, string[] tagList = null, string alias = null, string summary = null, DateTime? date = null, bool? allowComment = true)
        {
            categoryList = (categoryList ?? new int[0]).Distinct().ToArray();
            tagList = (tagList ?? new string[0]).Distinct().ToArray();

            List<Category> categoryEntityList = await BlogContext.Categories.Where(t => categoryList.Contains(t.ID)).ToListAsync();
            List<Tag> tagEntityList = await BlogContext.Tags.Where(t => tagList.Contains(t.Keyword)).ToListAsync();

            foreach (var tag in tagList)
            {
                if (!tagEntityList.Any(t => t.Keyword == tag))
                {
                    var tagEntity = new Tag
                    {
                        Keyword = tag
                    };
                    BlogContext.Tags.Add(tagEntity);
                    tagEntityList.Add(tagEntity);
                }
            }

            var topic = new Topic
            {
                Alias = alias,
                AllowComment = allowComment == true,
                Content = content,
                CreateDate = DateTime.Now,
                CreateUserID = 1,
                EditDate = date ?? DateTime.Now,
                EditUserID = 1,
                Status = status,
                Summary = summary,
                Title = title
            };
            BlogContext.Topics.Add(topic);

            List<CategoryTopic> categoryTopicList = categoryEntityList.Select(t => new CategoryTopic
            {
                Category = t,
                Topic = topic
            }).ToList();
            BlogContext.CategoryTopics.AddRange(categoryTopicList);

            List<TagTopic> tagTopicList = tagEntityList.Select(t => new TagTopic
            {
                Tag = t,
                Topic = topic
            }).ToList();
            BlogContext.TagTopics.AddRange(tagTopicList);

            await BlogContext.SaveChangesAsync();

            return new OperationResult<int>(topic.ID);
        }

        /// <summary>
        /// 查询正常状态的文章列表
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="status"></param>
        /// <param name="keywords"></param>
        /// <returns></returns>
        public async Task<PagedResult<TopicModel>> QueryNotTrash(int pageIndex, int pageSize, Enums.TopicStatus? status, string keywords)
        {
            var query = BlogContext.Topics.AsQueryable()
                .Where(t => t.Status != Enums.TopicStatus.Trash);

            if (status.HasValue)
            {
                query = query.Where(t => t.Status == status.Value);
            }
            if (!string.IsNullOrWhiteSpace(keywords))
            {
                query = query.Where(t => t.Title.Contains(keywords));
            }

            int total = await query.CountAsync();

            Topic[] entityList = await query.OrderByDescending(t => t.EditDate).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToArrayAsync();

            List<TopicModel> modelList = await Transform(entityList);

            return new PagedResult<TopicModel>(modelList, total);
        }

        private async Task<List<TopicModel>> Transform(params Topic[] entityList)
        {
            if (entityList == null)
            {
                return null;
            }

            int[] idList = entityList.Select(t => t.ID).ToArray();

            List<CategoryTopic> categoryTopicList = await BlogContext.CategoryTopics.Include(t => t.Category).Where(t => idList.Contains(t.TopicID)).ToListAsync();
            List<TagTopic> tagTopicList = await BlogContext.TagTopics.Include(t => t.Tag).Where(t => idList.Contains(t.TopicID)).ToListAsync();

            List<TopicModel> result = entityList.Select(entity =>
            {
                var model = AutoMapper.Mapper.Map<TopicModel>(entity);
                model.Categories = categoryTopicList.Where(category => category.TopicID == entity.ID)
                    .Select(category => new TopicModel.CategoryModel
                    {
                        ID = category.CategoryID,
                        Name = category.Category.Name
                    }).ToArray();
                model.Tags = tagTopicList.Where(tag => tag.TopicID == entity.ID)
                    .Select(tag => tag.Tag.Keyword)
                    .ToArray();
                return model;
            }).ToList();

            return result;
        }
    }
}
