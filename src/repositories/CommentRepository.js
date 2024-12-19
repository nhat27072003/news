import News from "../entities/News.js";

class CommentRepository {

  async saveComment(newsId, comment) {
    try {

      const news = await News.findById(newsId);
      if (news) {
        news.comments.push(comment);
        await news.save();
        return {
          message: "OK",
          code: '',
          data: []
        }
      } else {
        return {
          message: "Không tìm thấy bài viết!",
          code: '',
          data: []
        }
      }
    }
    catch (error) {
      console.log(error);
      return {
        message: "error",
        code: '',
        data: []
      }
    }
  }

  findCommentById(id) {

  }
}

export default CommentRepository;