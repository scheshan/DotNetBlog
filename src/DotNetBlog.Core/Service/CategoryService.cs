using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Category;
using DotNetBlog.Core.Extensions;

namespace DotNetBlog.Core.Service
{
    public class CategoryService
    {
        private BlogContext BlogContext { get; set; }

        public CategoryService(BlogContext blogContext)
        {
            BlogContext = blogContext;
        }

        public async Task<List<CategoryModel>> All()
        {
            List<CategoryModel> list = BlogContext.QueryAllCategoryFromCache();
            return await Task.FromResult(list);
        }

        public async Task<OperationResult<int>> Add(string name, string description)
        {
            if (await BlogContext.Categories.AnyAsync(t => t.Name == name))
            {
                return OperationResult<int>.Failure("重复的分类名称");
            }

            var entity = new Category
            {
                Description = description,
                Name = name
            };
            BlogContext.Categories.Add(entity);
            await BlogContext.SaveChangesAsync();

            BlogContext.RemoveCategoryCache();

            return new OperationResult<int>(entity.ID);
        }

        public async Task<OperationResult> Edit(int id, string name, string description)
        {
            if (await BlogContext.Categories.AnyAsync(t => t.Name == name && t.ID != id))
            {
                return OperationResult.Failure("重复的分类名称");
            }

            Category entity = await BlogContext.Categories.SingleOrDefaultAsync(t => t.ID == id);
            if(entity == null)
            {
                return OperationResult.Failure("分类不存在");
            }

            entity.Name = name;
            entity.Description = description;
            await BlogContext.SaveChangesAsync();

            BlogContext.RemoveCategoryCache();            

            return new OperationResult();
        }

        public async Task Remove(int[] idList)
        {
            List<CategoryTopic> categoryTopics = await BlogContext.CategoryTopics.Where(t => idList.Contains(t.CategoryID)).ToListAsync();
            List<Category> categories = await BlogContext.Categories.Where(t => idList.Contains(t.ID)).ToListAsync();

            BlogContext.RemoveRange(categoryTopics);
            BlogContext.RemoveRange(categories);

            await BlogContext.SaveChangesAsync();

            BlogContext.RemoveCategoryCache();
        }
    }
}
