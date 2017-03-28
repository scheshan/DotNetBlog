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
using Microsoft.AspNetCore.Mvc.Localization;

namespace DotNetBlog.Core.Service
{
    public class CategoryService
    {
        private BlogContext BlogContext { get; set; }
        private IHtmlLocalizer<CategoryService> L { get; set; }

        public CategoryService(BlogContext blogContext, IHtmlLocalizer<CategoryService> localizer)
        {
            BlogContext = blogContext;
            L = localizer;
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
                return OperationResult<int>.Failure(L["Duplicate category name"].Value);
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
                return OperationResult.Failure(L["Duplicate category name"].Value);
            }

            Category entity = await BlogContext.Categories.SingleOrDefaultAsync(t => t.ID == id);
            if(entity == null)
            {
                return OperationResult.Failure(L["Category does not exists"].Value);
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
