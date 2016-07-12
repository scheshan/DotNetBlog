using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Account.Models.Home
{
    public class LoginViewModel
    {
        public LoginModel Model { get; set; }

        public string ErrorMessage { get; set; }
    }
}
