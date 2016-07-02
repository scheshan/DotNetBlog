using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DotNetBlog.Web.Areas.Api.Models.Config;
using DotNetBlog.Core.Model.Setting;
using DotNetBlog.Core.Model.Topic;
using DotNetBlog.Core.Entity;

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
                config.CreateMap<Topic, TopicModel>().ForMember(dest => dest.Date, map => map.MapFrom(source => source.EditDate));
            });
        }
    }
}
