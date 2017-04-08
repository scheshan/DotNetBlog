using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DotNetBlog.Core.Model.Install
{
    public class InstallModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Nickname { get; set; }

        [Required]
        public string BlogTitle { get; set; }

        [Required]
        public string BlogHost { get; set; }

        [Required]
        public string Language { get; set; }
    }
}
