using DotNetBlog.Core.Model.Setting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;

namespace DotNetBlog.Web.ViewEngines
{
    public class ThemeViewEngine : IViewLocationExpander
    {
        public const string ThemeKey = "__theme";

        public void PopulateValues(ViewLocationExpanderContext context)
        {
            //Cache the Theme and the key for the current session
            var settingService = context.ActionContext.HttpContext.RequestServices.GetService<Core.Service.SettingService>();
            context.Values[ThemeKey] = settingService.Get().Theme;
        }

        public IEnumerable<string> ExpandViewLocations(
            ViewLocationExpanderContext context,
            IEnumerable<string> viewLocations)
        {
            string theme = null;
            if (context.Values.TryGetValue(ThemeKey, out theme))
            {
                //Set theme name to get it in other place for current request
                context.ActionContext.HttpContext.Items[ThemeKey] = theme;

                viewLocations = new[] {
                    $"/Themes/{theme}/{{1}}/{{0}}.cshtml",
                    $"/Themes/{theme}/Shared/{{0}}.cshtml",
                    //Also for solve the mistake of theme developer we add default path too
                    $"/Themes/{SettingModel.DefaultTheme}/{{1}}/{{0}}.cshtml",
                    $"/Themes/{SettingModel.DefaultTheme}/Shared/{{0}}.cshtml",
                }.Concat(viewLocations);
            }
            else
            {
                //Set theme name to get it in other place for current request
                context.ActionContext.HttpContext.Items[ThemeKey] = SettingModel.DefaultTheme;

                viewLocations = new[] {
                    $"/Themes/{SettingModel.DefaultTheme}/{{1}}/{{0}}.cshtml",
                    $"/Themes/{SettingModel.DefaultTheme}/Shared/{{0}}.cshtml",
                }.Concat(viewLocations);
            }


            return viewLocations;
        }
    }
}
