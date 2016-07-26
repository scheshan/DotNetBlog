using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DotNetBlog.Core.Extensions
{
    public static class StringExtensions
    {
        public static string TrimHtml(this string input)
        {
            if (string.IsNullOrEmpty(input)) return input;

            //删除脚本
            input = Regex.Replace(input, @"<script[^>]*?>.*?</script>", "",
              RegexOptions.IgnoreCase);
            //删除HTML
            input = Regex.Replace(input, @"<(.[^>]*)>", "",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"([\r\n])[\s]+", "",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"-->", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"<!--.*", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(quot|#34);", "\"",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(amp|#38);", "&",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(lt|#60);", "<",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(gt|#62);", ">",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(nbsp|#160);", "   ",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(iexcl|#161);", "\xa1",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(cent|#162);", "\xa2",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(pound|#163);", "\xa3",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&(copy|#169);", "\xa9",
              RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"&#(\d+);", "",
              RegexOptions.IgnoreCase);

            input.Replace("<", "&lt;");
            input.Replace(">", "&gt;");
            input.Replace("\r\n", "<br/>");

            return input;
        }

        public static string ToLength(this string input, int length)
        {
            if(string.IsNullOrWhiteSpace(input))
            {
                return input;
            }

            if (input.Length < length)
            {
                return input;
            }
            return input.Substring(0, length);
        }
    }
}
