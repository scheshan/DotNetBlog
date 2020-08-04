using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.ViewModels.Account
{
    public class LoginModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        public bool RememberMe { get; set; }

        public string Redirect { get; set; }
    }
}
