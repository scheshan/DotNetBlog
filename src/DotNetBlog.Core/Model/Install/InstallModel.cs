using System.ComponentModel.DataAnnotations;

namespace DotNetBlog.Core.Model.Install
{
    public class InstallModel
    {
        [Required]
        [StringLength(20)]
        public string UserName { get; set; }

        [Required]
        [StringLength(20)]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }

        [Required]
        [StringLength(20)]
        public string Nickname { get; set; }

        [Required]
        [StringLength(100)]
        public string BlogTitle { get; set; }

        [Required]
        [StringLength(100)]
        public string BlogHost { get; set; }

        [Required]
        public string Language { get; set; }
    }
}
