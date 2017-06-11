using DotNetBlog.Core.Model.Setting;
using DotNetBlog.Core.Model.Theme;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class ThemeService
    {

        static object lockObj = new object();
        static FileSystemWatcher watcher;

        static Dictionary<string, ThemeModel> themes = new Dictionary<string, ThemeModel>();

        public SettingModel Settings { get; set; }
        public ThemeService(IHostingEnvironment hostEnvironment, SettingModel settings)
        {
            Settings = settings;
            lock (lockObj)
            {
                if (watcher == null)
                {
                    Run(hostEnvironment);
                    ReloadThemes();
                }
            }
        }

        private static void Run(IHostingEnvironment hostEnvironment)
        {
            watcher = new FileSystemWatcher();

            // Create a new FileSystemWatcher and set its properties.
            watcher.Path = Path.Combine(hostEnvironment.ContentRootPath, "Themes");
            /* Watch for changes in LastAccess and LastWrite times, and
               the renaming of files or directories. */
            watcher.NotifyFilter = NotifyFilters.LastWrite
               | NotifyFilters.FileName | NotifyFilters.DirectoryName
               | NotifyFilters.Size | NotifyFilters.Security
               | NotifyFilters.Attributes | NotifyFilters.CreationTime;

            watcher.IncludeSubdirectories = true;

            // Add event handlers.
            watcher.Changed += Watcher_Changed;
            watcher.Created += Watcher_Created;
            watcher.Deleted += Watcher_Deleted;
            watcher.Renamed += Watcher_Renamed;

            // Begin watching.
            watcher.EnableRaisingEvents = true;
        }

        private static void Watcher_Changed(object sender, FileSystemEventArgs e)
        {
            lock (lockObj)
            {
                ReloadThemes();
            }
        }

        private static void Watcher_Created(object sender, FileSystemEventArgs e)
        {
            lock (lockObj)
            {
                ReloadThemes();
            }
        }

        private static void Watcher_Deleted(object sender, FileSystemEventArgs e)
        {
            lock (lockObj)
            {
                ReloadThemes();
            }
        }

        private static void Watcher_Renamed(object sender, RenamedEventArgs e)
        {
            lock (lockObj)
            {
                ReloadThemes();
            }
        }

        private static void ReloadThemes()
        {
            themes.Clear();

            var path = watcher.Path;
            var directories = Directory.GetDirectories(path);
            foreach (var themeDir in directories)
            {
                var infoPath = Path.Combine(themeDir, "theme.json");
                try
                {
                    if (File.Exists(infoPath))
                    {
                        var theme = Newtonsoft.Json.JsonConvert.DeserializeObject<ThemeModel>(File.ReadAllText(infoPath));
                        if (theme != null)
                        {
                            theme.Path = themeDir;
                            theme.Key = Path.GetFileNameWithoutExtension(themeDir);
                            LoadTheme(theme);
                        }
                    }
                }
                catch
                {
                    /* No need to do something for the moment. */
                    /* Maybe we can do something in log/notification center later */
                    //TODO: For Notification Center
                }
            }
        }

        private static void LoadTheme(ThemeModel theme)
        {
            if (!themes.ContainsKey(theme.Key))
                themes.Add(theme.Key, theme);
        }

        public IEnumerable<ThemeModel> All()
        {
            return themes.Values;
        }

        public ThemeModel Get()
        {
            if (!themes.ContainsKey(Settings.Theme))
                return themes[SettingModel.DefaultTheme];

            return themes[Settings.Theme];
        }
    }
}
