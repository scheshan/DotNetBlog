using DotNetBlog.Core.Model.Install;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Install
{
    public class IndexViewModel
    {
        public string ErrorMessage { get; set; }

        public SelectList LanguageList { get; set; }

        public InstallModel Model { get; set; }
    }
}
