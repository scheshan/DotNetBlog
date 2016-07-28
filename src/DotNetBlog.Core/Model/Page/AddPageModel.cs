using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Page
{
    public class AddPageModel
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string Alias { get; set; }

        public string Summary { get; set; }

        public string Keywords { get; set; }

        public DateTime? Date { get; set; }

        public int? Parent { get; set; }

        public int Order { get; set; }

        public bool IsHomePage { get; set; }

        public bool ShowInList { get; set; }

        public Enums.PageStatus Status { get; set; }
    }
}
