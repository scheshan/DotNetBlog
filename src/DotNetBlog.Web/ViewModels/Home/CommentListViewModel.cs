using DotNetBlog.Core.Model.Comment;
using DotNetBlog.Core.Model.Topic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class CommentListViewModel
    {
        /// <summary>
        /// 是否允许评论
        /// </summary>
        public bool AllowComment { get; set; }

        /// <summary>
        /// 所有评论列表
        /// </summary>
        public List<CommentModel> AllCommentList { get; set; }

        /// <summary>
        /// 适合本页用的评论列表
        /// </summary>
        public List<CommentModel> CommentList { get; set; }
    }
}
