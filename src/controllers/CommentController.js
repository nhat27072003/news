import CommentService from "../services/CommentService.js";

class CommentController {
  #commentService = new CommentService;

  constructor() {
    this.createComment = this.createComment.bind(this);
  }
  async createComment(req, res) {
    try {
      const userId = req.user.id;
      const userName = req.user.username;
      const { newsId, comment } = req.body;
      const result = await this.#commentService.saveComment({ newsId, userId, userName, comment });
      if (result) {
        res.redirect(`/news/${newsId}`);
      } else {
        res.status(200).json(result);
      }
    }
    catch (error) {
      res.status(200).json({
        message: "error",
        code: '',
        data: []
      })
    }
  }

}

export default CommentController;