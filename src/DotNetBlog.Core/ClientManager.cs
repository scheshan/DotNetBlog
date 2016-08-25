using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetBlog.Core.Extensions;

namespace DotNetBlog.Core
{
    public class ClientManager
    {
        private static readonly string CookieName = "DotNetBlog_User";

        public HttpContext HttpContext { get; private set; }

        private BlogContext BlogContext { get; set; }

        public string Token { get; private set; }

        public User CurrentUser { get; private set; }

        private string _clientIP;

        public string ClientIP
        {
            get
            {
                if (_clientIP == null)
                {
                    IHttpConnectionFeature feature = this.HttpContext.Features.Get<IHttpConnectionFeature>();
                    _clientIP = feature.RemoteIpAddress.ToString();
                }

                return _clientIP;
            }
        }

        public bool IsLogin
        {
            get
            {
                return this.CurrentUser != null;
            }
        }

        public ClientManager(BlogContext blogContext)
        {
            this.BlogContext = blogContext;
        }

        public void Init(HttpContext context)
        {
            this.HttpContext = context;
            this.InitToken();
            this.InitUser();
        }

        private void InitToken()
        {
            string token = this.HttpContext.Request.Cookies[CookieName];
            if (string.IsNullOrWhiteSpace(token))
            {
                token = this.HttpContext.Request.Query["token"].FirstOrDefault();
            }
            if (string.IsNullOrWhiteSpace(token))
            {
                token = this.HttpContext.Request.Headers["token"].FirstOrDefault();
            }

            this.Token = token;
        }

        private void InitUser()
        {
            if (!string.IsNullOrWhiteSpace(this.Token))
            {
                try
                {
                    var userTokens = BlogContext.QueryUserTokenFromCache();
                    if (userTokens.ContainsKey(this.Token))
                    {
                        var userToken = userTokens[this.Token];
                        var users = BlogContext.QueryUserFromCache();

                        this.CurrentUser = users.SingleOrDefault(t => t.ID == userToken.UserID);
                    }
                }
                catch
                {

                }
            }
        }

        public static void WriteTokenIntoCookies(HttpContext context, string token, bool remember)
        {
            if (remember)
            {
                context.Response.Cookies.Append(CookieName, token, new CookieOptions { Expires = DateTime.Now.AddDays(60) });
            }
            else
            {
                context.Response.Cookies.Append(CookieName, token);
            }
        }

        public static void ClearTokenFromCookies(HttpContext context)
        {
            context.Response.Cookies.Delete(CookieName, new CookieOptions { Expires = DateTime.Now.AddDays(-1) });
        }
    }
}
