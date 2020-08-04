using Microsoft.Extensions.Localization;
using System.Collections.Generic;

namespace DotNetBlog.Core.Model.Setting
{
    public class SettingModel
    {

        #region Default(s)

        public const string DefaultHost = "http://dotnetblog.com";
        public const string DefaultTitle = "DotNetBlog";
        public const string DefaultTheme = "default";
        public const int DefaultTopicPerPage = 10;
        public const bool DefaultOnlyShowSummary = false;
        public const string DefaultSmtpEmailAddress = "name@example.com";
        public const string DefaultSmtpServer = "mail.example.com";
        public const string DefaultSmtpUser = "username";
        public const string DefaultSmtpPassword = "password";
        public const int DefaultSmtpPort = 25;
        public const bool DefaultSmtpEnableSSL = false;
        public const bool DefaultSendEmailWhenComment = true;
        public const bool DefaultAllowComment = true;
        public const bool DefaultVerifyComment = true;
        public const bool DefaultTrustAuthenticatedCommentUser = true;
        public const bool DefaultEnableCommentWebSite = true;
        public const int DefaultCloseCommentDays = 0;
        public const string DefaultErrorPageTitle = "Sorry the system has made an error";
        public const string DefaultErrorPageContent = "Request page is wrong please try again later";
        public const string DefaultHeaderScript = "";
        public const string DefaultFooterScript = "";

        #endregion

        #region Properties and Constractor

        internal Dictionary<string, string> Settings { get; set; }

        internal IStringLocalizer<SettingModel> L { get; set; }

        public SettingModel(Dictionary<string, string> settings, IStringLocalizer<SettingModel> localizer)
        {
            Settings = settings;
            L = localizer;
        }

        /// <summary>
        /// 博客的URL地址
        /// </summary>
        public string Host
        {
            get
            {
                return GetStringValue(nameof(Host), L[DefaultHost].Value);
            }
            set
            {
                SetValue(nameof(Host), value);
            }
        }

        /// <summary>
        /// 站点名称
        /// </summary>
        public string Title
        {
            get
            {
                return GetStringValue(nameof(Title), L[DefaultTitle].Value);
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
        /// Selected language
        /// </summary>
        public string Language
        {
            get
            {
                return GetStringValue(nameof(Language), "en-GB");
            }
            set
            {
                SetValue(nameof(Language), value);
            }
        }
        /// <summary>
        /// Selected Theme
        /// </summary>
        public string Theme
        {
            get
            {
                return GetStringValue(nameof(Theme), DefaultTheme);
            }
            set
            {
                SetValue(nameof(Theme), value);
            }
        }
        /// <summary>
        /// 每页文章数
        /// </summary>
        public int TopicsPerPage
        {
            get
            {
                return GetIntValue(nameof(TopicsPerPage), DefaultTopicPerPage);
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
                return GetBooleanValue(nameof(OnlyShowSummary), DefaultOnlyShowSummary);
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
                return GetStringValue(nameof(SmtpEmailAddress), L[DefaultSmtpEmailAddress].Value);
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
                return GetStringValue(nameof(SmtpServer), L[DefaultSmtpServer].Value);
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
                return GetStringValue(nameof(SmtpUser), L[DefaultSmtpUser].Value);
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
                return GetStringValue(nameof(SmtpPassword), L[DefaultSmtpPassword].Value);
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
                return GetIntValue(nameof(SmtpPort), DefaultSmtpPort);
            }
            set
            {
                SetValue(nameof(SmtpPort), value.ToString());
            }
        }

        /// <summary>
        /// SMTP服务器是否使用SSL
        /// </summary>
        public bool SmtpEnableSSL
        {
            get
            {
                return GetBooleanValue(nameof(SmtpEnableSSL), DefaultSmtpEnableSSL);
            }
            set
            {
                SetValue(nameof(SmtpEnableSSL), value.ToString());
            }
        }

        /// <summary>
        /// 发送评论邮件
        /// </summary>
        public bool SendEmailWhenComment
        {
            get
            {
                return GetBooleanValue(nameof(SendEmailWhenComment), DefaultSendEmailWhenComment);
            }
            set
            {
                SetValue(nameof(SendEmailWhenComment), value.ToString());
            }
        }

        /// <summary>
        /// 是否允许评论
        /// </summary>
        public bool AllowComment
        {
            get
            {
                return GetBooleanValue(nameof(AllowComment), DefaultAllowComment);
            }
            set
            {
                SetValue(nameof(AllowComment), value.ToString());
            }
        }

        /// <summary>
        /// 是否审核评论
        /// </summary>
        public bool VerifyComment
        {
            get
            {
                return GetBooleanValue(nameof(VerifyComment), DefaultVerifyComment);
            }
            set
            {
                SetValue(nameof(VerifyComment), value.ToString());
            }
        }

        /// <summary>
        /// 信任通过审核的评论用户
        /// </summary>
        public bool TrustAuthenticatedCommentUser
        {
            get
            {
                return GetBooleanValue(nameof(TrustAuthenticatedCommentUser), DefaultTrustAuthenticatedCommentUser);
            }
            set
            {
                SetValue(nameof(TrustAuthenticatedCommentUser), value.ToString());
            }
        }

        /// <summary>
        /// 在评论中启用网站
        /// </summary>
        public bool EnableCommentWebSite
        {
            get
            {
                return GetBooleanValue(nameof(EnableCommentWebSite), true);
            }
            set
            {
                SetValue(nameof(EnableCommentWebSite), value.ToString());
            }
        }

        /// <summary>
        /// 自动关闭评论
        /// </summary>
        public int CloseCommentDays
        {
            get
            {
                return GetIntValue(nameof(CloseCommentDays), 0);
            }
            set
            {
                SetValue(nameof(CloseCommentDays), value.ToString());
            }
        }

        /// <summary>
        /// 错误页面标题
        /// </summary>
        public string ErrorPageTitle
        {
            get
            {
                return GetStringValue(nameof(ErrorPageTitle), L[DefaultErrorPageTitle].Value);
            }
            set
            {
                SetValue(nameof(ErrorPageTitle), value.ToString());
            }
        }

        /// <summary>
        /// 错误页面内容
        /// </summary>
        public string ErrorPageContent
        {
            get
            {
                return GetStringValue(nameof(ErrorPageContent), L[DefaultErrorPageContent].Value);
            }
            set
            {
                SetValue(nameof(ErrorPageContent), value.ToString());
            }
        }

        /// <summary>
        /// 顶部区域脚本
        /// </summary>
        public string HeaderScript
        {
            get
            {
                return GetStringValue(nameof(HeaderScript), string.Empty);
            }
            set
            {
                SetValue(nameof(HeaderScript), value.ToString());
            }
        }

        /// <summary>
        /// 底部区域脚本
        /// </summary>
        public string FooterScript
        {
            get
            {
                return GetStringValue(nameof(FooterScript), DefaultFooterScript);
            }
            set
            {
                SetValue(nameof(FooterScript), value.ToString());
            }
        }

        #endregion

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
