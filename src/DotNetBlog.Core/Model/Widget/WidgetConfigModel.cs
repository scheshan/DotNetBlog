using Microsoft.Extensions.Localization;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DotNetBlog.Core.Model.Widget
{
    public abstract class WidgetConfigModelBase
    {
        public string Title { get; set; }

        [JsonIgnore]
        public virtual bool IsValid
        {
            get
            {
                return !string.IsNullOrWhiteSpace(this.Title);
            }
        }
    }

    public class AdministrationWidgetConfigModel : WidgetConfigModelBase
    {
        public AdministrationWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Administration"].Value;
        }
    }

    public class CategoryWidgetConfigModel : WidgetConfigModelBase
    {
        public CategoryWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Categories"].Value;
            this.ShowRSS = true;
            this.ShowNumbersOfTopics = true;
        }

        public bool ShowRSS { get; set; }

        public bool ShowNumbersOfTopics { get; set; }
    }

    public class RecentCommentWidgetConfigModel : WidgetConfigModelBase
    {
        public RecentCommentWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Recent comments"].Value;
            this.Number = 10;
        }

        public int Number { get; set; }

        public override bool IsValid
        {
            get
            {
                return base.IsValid && this.Number > 0;
            }
        }
    }

    public class MonthStatisticeWidgetConfigModel : WidgetConfigModelBase
    {
        public MonthStatisticeWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Archive"].Value;
        }
    }

    public class PageWidgetConfigModel : WidgetConfigModelBase
    {
        public PageWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Pages"].Value;
        }
    }

    public class RecentTopicWidgetConfigModel : WidgetConfigModelBase
    {
        public RecentTopicWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Recent articles"].Value;
            this.Number = 10;
        }

        public int Number { get; set; }

        public int? Category { get; set; }

        public override bool IsValid
        {
            get
            {
                return base.IsValid && this.Number > 0;
            }
        }
    }

    public class SearchWidgetConfigModel : WidgetConfigModelBase
    {
        public SearchWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Search for"].Value;
        }
    }

    public class TagWidgetConfigModel : WidgetConfigModelBase
    {
        public TagWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Tags"].Value;
            this.Number = 100;
            this.MinTopicNumber = 1;
        }

        public int? Number { get; set; }

        public int MinTopicNumber { get; set; }

        public override bool IsValid
        {
            get
            {
                return base.IsValid && (!this.Number.HasValue || this.Number > 0) && this.MinTopicNumber > 0;
            }
        }
    }

    public class LinkWidgetConfigModel : WidgetConfigModelBase
    {
        public LinkWidgetConfigModel(IStringLocalizer L)
        {
            this.Title = L?["Links"].Value;
            this.LinkList = new List<LinkModel>();
        }

        public List<LinkModel> LinkList { get; set; }

        public override bool IsValid
        {
            get
            {
                return base.IsValid && this.LinkList != null;
            }
        }

        public class LinkModel
        {
            public string Title { get; set; }

            public string Url { get; set; }

            public bool OpenInNewWindow { get; set; }
        }
    }
}
