using DotNetBlog.Core.Data;
using DotNetBlog.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class AuthService
    {
        private BlogContext BlogContext { get; set; }

        public AuthService(BlogContext blogContext)
        {
            BlogContext = blogContext;
        }

        public async Task<OperationResult<string>> Login(string userName, string password)
        {
            return null;
        }
    }
}
