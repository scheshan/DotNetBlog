using Markdig;

namespace DotNetBlog
{
    public static class MarkdownUtils
    {
        private static MarkdownPipeline pipeline;

        static MarkdownUtils()
        {
            var builder = new MarkdownPipelineBuilder()
                .UsePipeTables(new Markdig.Extensions.Tables.PipeTableOptions
                {
                    RequireHeaderSeparator = false
                })
                .UseAdvancedExtensions()
                .UseBootstrap();

            pipeline = builder.Build();
        }

        public static string FromMarkdown(this string markdown)
        {
            return Markdown.ToHtml(markdown, pipeline);
        }

    }
}
