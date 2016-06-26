using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Model.Setting
{
    public class SettingModel
    {
        internal Dictionary<string, string> Settings { get; set; }

        public SettingModel(Dictionary<string, string> settings)
        {
            Settings = settings;
        }

        /// <summary>
        /// 站点名称
        /// </summary>
        public string Title
        {
            get
            {
                return GetStringValue(nameof(Title), "DotNetBlog");
            }
            set
            {
                SetValue(nameof(Title), value);
            }
        }

        /// <summary>
        /// 站点摘要
        /// </summary>
        public string Description
        {
            get
            {
                return GetStringValue(nameof(Description), "");
            }
            set
            {
                SetValue(nameof(Description), value);
            }
        }

        /// <summary>
        /// 每页文章数
        /// </summary>
        public int TopicsPerPage
        {
            get
            {
                return GetIntValue(nameof(TopicsPerPage), 10);
            }
            set
            {
                SetValue(nameof(TopicsPerPage), value.ToString());
            }
        }

        /// <summary>
        /// 仅仅显示文章摘要
        /// </summary>
        public bool OnlyShowSummary
        {
            get
            {
                return GetBooleanValue(nameof(OnlyShowSummary), false);
            }
            set
            {
                SetValue(nameof(OnlyShowSummary), value.ToString());
            }
        }

        /// <summary>
        /// 发送邮件的Email地址
        /// </summary>
        public string SmtpEmailAddress
        {
            get
            {
                return GetStringValue(nameof(SmtpEmailAddress), "name@example.com");
            }
            set
            {
                SetValue(nameof(SmtpEmailAddress), value);
            }
        }

        /// <summary>
        /// SMTP服务器
        /// </summary>
        public string SmtpServer
        {
            get
            {
                return GetStringValue(nameof(SmtpServer), "mail.example.com");
            }
            set
            {
                SetValue(nameof(SmtpServer), value);
            }
        }

        /// <summary>
        /// SMTP服务器用户名
        /// </summary>
        public string SmtpUser
        {
            get
            {
                return GetStringValue(nameof(SmtpUser), "username");
            }
            set
            {
                SetValue(nameof(SmtpUser), value);
            }
        }

        /// <summary>
        /// SMTP服务器密码
        /// </summary>
        public string SmtpPassword
        {
            get
            {
                return GetStringValue(nameof(SmtpPassword), "password");
            }
            set
            {
                SetValue(nameof(SmtpPassword), value);
            }
        }

        /// <summary>
        /// SMTP服务器端口
        /// </summary>
        public int SmtpPort
        {
            get
            {
                return GetIntValue(nameof(SmtpPort), 25);
            }
            set
            {
                SetValue(nameof(SmtpPort), value.ToString());
            }
        }

        /// <summary>
        /// 发送评论邮件
        /// </summary>
        public bool SendEmailWhenComment
        {
            get
            {
                return GetBooleanValue(nameof(SendEmailWhenComment), true);
            }
            set
            {
                SetValue(nameof(SendEmailWhenComment), value.ToString());
            }
        }

        #region Private Methods

        private string GetStringValue(string key, string defaultValue)
        {
            if (Settings.ContainsKey(key))
            {
                return Settings[key];
            }
            else
            {
                return defaultValue;
            }
        }

        private int GetIntValue(string key, int defaultValue)
        {
            int result;

            if (Settings.ContainsKey(key))
            {
                if (!int.TryParse(Settings[key], out result))
                {
                    result = defaultValue;
                }
            }
            else
            {
                result = defaultValue;
            }

            return result;
        }

        private bool GetBooleanValue(string key, bool defaultValue)
        {
            bool result;

            if (Settings.ContainsKey(key))
            {
                if (!bool.TryParse(Settings[key], out result))
                {
                    result = defaultValue;
                }
            }
            else
            {
                result = defaultValue;
            }

            return result;
        }

        private void SetValue(string key, string value)
        {
            Settings[key] = value;
        }

        #endregion
    }
}
