using DotNetBlog.Core.Data;
using DotNetBlog.Core.Entity;
using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Email;
using DotNetBlog.Core.Model.Setting;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using NLog;
using System;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class EmailService
    {
        private SettingModel Settings { get; set; }

        private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();

        private BlogContext BlogContext { get; set; }

        private IHtmlLocalizer<EmailService> L { get; set; }

        public EmailService(SettingModel settings, BlogContext blogContext, IHtmlLocalizer<EmailService> localizer)
        {
            this.Settings = settings;
            this.BlogContext = blogContext;
            this.L = localizer;
        }

        public async Task<OperationResult> TestEmailConfig(TestEmailConfigModel model)
        {
            try
            {
                using (SmtpClient client = new SmtpClient())
                {
                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress(model.EmailAddress, model.EmailAddress));
                    message.To.Add(new MailboxAddress(model.EmailAddress, model.EmailAddress));
                    message.Subject = L["Test Email"].Value;

                    message.Body = new TextPart("plain")
                    {
                        Text = L["Hello world"].Value
                    };

                    await client.ConnectAsync(model.Server, model.Port, model.EnableSSL);

                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    // Note: only needed if the SMTP server requires authentication
                    client.Authenticate(model.User, model.Password);

                    await client.SendAsync(message);

                    await client.DisconnectAsync(true);

                    return new OperationResult();
                }
            }
            catch (Exception ex)
            {
                return OperationResult.Failure(ex.Message);
            }
        }

        public async Task<OperationResult> SendCommentEmail(Topic topic, Comment comment)
        {
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress(this.Settings.SmtpEmailAddress, this.Settings.SmtpEmailAddress));

            var user = await this.BlogContext.Users.SingleOrDefaultAsync(t => t.ID == topic.CreateUserID);
            if (user == null || string.IsNullOrWhiteSpace(user.Email))
            {
                return OperationResult.Failure(L["No email specified"].Value);
            }

            var topicUrl = $"{this.Settings.Host}/topic/{topic.ID}#comment_{comment.ID}";
            message.To.Add(new MailboxAddress(user.Email, user.Email));
            message.Subject = L["[Blog comment notification] Re: {0}", topic.Title].Value;
            message.Body = new TextPart("html")
            {
                Text = L["Email_NewComment", topic.Title, comment.Content, comment.Email, comment.Name, topicUrl].Value
            };

            return await this.SendEmail(message);
        }

        public async Task<OperationResult> SendReplyEmail(Topic topic, Comment comment, Comment replyTo)
        {
            return null;
        }

        private async Task<OperationResult> SendEmail(MimeMessage message)
        {
            try
            {
                using (SmtpClient client = new SmtpClient())
                {
                    await client.ConnectAsync(this.Settings.SmtpServer, this.Settings.SmtpPort, this.Settings.SmtpEnableSSL);

                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    // Note: only needed if the SMTP server requires authentication
                    client.Authenticate(this.Settings.SmtpUser, this.Settings.SmtpPassword);

                    await client.SendAsync(message);

                    await client.DisconnectAsync(true);

                    return new OperationResult();
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return OperationResult.Failure(ex.Message);
            }
        }
    }
}
