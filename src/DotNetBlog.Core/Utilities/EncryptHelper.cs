using System;
using System.Security.Cryptography;
using System.Text;

namespace DotNetBlog.Core.Utilities
{
    public sealed class EncryptHelper
    {
        public static string MD5(string input)
        {
            if (input == null)
            {
                throw new ArgumentNullException("input");
            }

            using (MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputData = Encoding.UTF8.GetBytes(input);
                byte[] computedData = md5.ComputeHash(inputData);

                return BitConverter.ToString(computedData).Replace("-", "");
            }
        }
    }
}
