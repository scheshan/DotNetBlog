using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

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
