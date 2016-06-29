using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.Areas.Api.Models.Config
{
    public class EmailConfigModel
    {
        public string SmtpEmailAddress { get; set; }

        public string SmtpServer { get; set; }

        public string SmtpUser { get; set; }

        public string SmtpPassword { get; set; }

        public int SmtpPort { get; set; }

        public bool SendEmailWhenComment { get; set; }
    }
}
