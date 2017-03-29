using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Install
{
    public class InstallConfig
    {

        public string AdminUsername { get; set; }
        public string AdminPassword { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public string Language { get; set; }

    }
}
