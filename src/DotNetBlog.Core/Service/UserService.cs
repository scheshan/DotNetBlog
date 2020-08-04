using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Extensions;
using DotNetBlog.Core.Model;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class UserService
    {
        private BlogContext BlogContext { get; set; }

        private IHtmlLocalizer<UserService> L { get; set; }

        public UserService(BlogContext blogContext, IHtmlLocalizer<UserService> localizer)
        {
            BlogContext = blogContext;
            L = localizer;
        }

        public async Task<OperationResult> ChangePassword(int id, string oldPassword, string newPassword)
        {
            oldPassword = Utilities.EncryptHelper.MD5(oldPassword);
            newPassword = Utilities.EncryptHelper.MD5(newPassword);

            User entity = await BlogContext.Users.SingleOrDefaultAsync(t => t.ID == id);

            if (entity == null)
            {
                return OperationResult.Failure(L["User does not exists"].Value);
            }
            if (entity.Password != oldPassword)
            {
                return OperationResult.Failure(L["Wrong password"].Value);
            }

            entity.Password = newPassword;
            await BlogContext.SaveChangesAsync();

            BlogContext.RemoveUserCache();

            return new Model.OperationResult();
        }

        public async Task<OperationResult> EditUserInfo(int id, string email, string nickname)
        {
            if (await BlogContext.Users.AnyAsync(t => t.Email == email && t.ID != id))
            {
                return OperationResult.Failure(L["Duplicated email address"].Value);
            }

            var user = await BlogContext.Users.SingleOrDefaultAsync(t => t.ID == id);

            if (user == null)
            {
                return OperationResult.Failure(L["User does not exists"].Value);
            }

            user.Email = email;
            user.Nickname = nickname;

            await BlogContext.SaveChangesAsync();

            BlogContext.RemoveUserCache();

            return new Model.OperationResult();
        }
    }
}
