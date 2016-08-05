using DotNetBlog.Core.Model;
using DotNetBlog.Core.Model.Email;
using DotNetBlog.Core.Model.Setting;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Service
{
    public class EmailService
    {
        private SettingModel Settings { get; set; }

        public EmailService(SettingModel settings)
        {
            this.Settings = settings;
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
                    message.Subject = "Test Email";

                    message.Body = new TextPart("plain")
                    {
                        Text = @"Hello world!"
                    };

                    await client.ConnectAsync(model.Server, model.Port, false);

                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    // Note: only needed if the SMTP server requires authentication
                    client.Authenticate(model.User, model.Password);

                    await client.SendAsync(message);
                    
                    await client.DisconnectAsync(true);

                    return new OperationResult();
                }
            }
            catch(Exception ex)
            {
                return OperationResult.Failure(ex.Message);
            }
        }
    }
}
