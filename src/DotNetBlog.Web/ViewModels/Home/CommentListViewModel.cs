using DotNetBlog.Core.Model.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetBlog.Web.ViewModels.Home
{
    public class CommentListViewModel
    {
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
