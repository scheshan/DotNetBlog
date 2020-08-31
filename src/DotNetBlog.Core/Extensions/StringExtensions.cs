using System.Text.RegularExpressions;

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

            input = input.Replace("<", "&lt;");
            input = input.Replace(">", "&gt;");
            input = input.Replace("\r\n", "");
            input = input.Replace("\r", "");
            input = input.Replace("\n", "");

            return input;
        }

        public static string ToLength(this string input, int length)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return input;
            }

            if (input.Length < length)
            {
                return input;
            }
            return input.Substring(0, length);
        }

        public static string TrimNotCharater(this string input)
        {
            if (input == null)
            {
                return string.Empty;
            }

            var regex = new Regex("[^\u4e00-\u9fa5_a-zA-Z0-9]");
            return regex.Replace(input, "");
        }
    }
}
