using System;

namespace DotNetBlog.Core.Entity
{
    public class User
    {
        public int ID { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Nickname { get; set; }

        public DateTime? LoginDate { get; set; }

        public string Avatar { get; set; }
    }
}
