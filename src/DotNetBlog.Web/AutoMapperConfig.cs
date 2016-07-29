using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DotNetBlog.Web.Areas.Api.Models.Config;
using DotNetBlog.Core.Model.Setting;
using DotNetBlog.Core.Model.Topic;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Model.Page;

namespace DotNetBlog.Web
{
    public sealed class AutoMapperConfig
    {
        public static void Configure()
        {
            Mapper.Initialize(config =>
            {
                config.CreateMap<BasicConfigModel, SettingModel>();
                config.CreateMap<SettingModel, BasicConfigModel>();
                config.CreateMap<EmailConfigModel, SettingModel>();
                config.CreateMap<SettingModel, EmailConfigModel>();
                config.CreateMap<SettingModel, CommentConfigModel>();
                config.CreateMap<CommentConfigModel, SettingModel>();

                config.CreateMap<Topic, TopicModel>().ForMember(dest => dest.Date, map => map.MapFrom(source => source.EditDate));
                config.CreateMap<Page, PageModel>().ForMember(dest => dest.Date, map => map.MapFrom(source => source.EditDate));
                config.CreateMap<Page, PageBasicModel>().ForMember(dest => dest.Date, map => map.MapFrom(source => source.EditDate));
                config.CreateMap<AddPageModel, Page>();
                config.CreateMap<EditPageModel, Page>();
            });
        }
    }
}
