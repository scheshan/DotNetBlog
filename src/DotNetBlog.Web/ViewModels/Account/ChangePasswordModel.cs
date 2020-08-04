using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Web.ViewModels.Account
{
    public class ChangePasswordModel
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}
