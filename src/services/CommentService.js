import CommentRepository from "../repositories/CommentRepository.js";

class CommentService {
  #commentRepository;
  constructor() {
    this.#commentRepository = new CommentRepository();
  }

  async saveComment({ newsId, userId, userName, comment }) {
    try {
      const result = await this.#commentRepository.saveComment(newsId, { userId, userName, comment });

      return result;
    }
    catch (error) {
      console.log(error);
      return {
        message: "comment service error",
        code: '',
        data: []
      }
    }
  }

  getComment(id) {

  }
}

export default CommentService;