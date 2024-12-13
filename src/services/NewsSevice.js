import NewsRepository from "../repositories/NewsRepository.js";

class NewsService {
  #newRepository;
  #title;
  #id;
  #author;
  #content;

  constructor() {
    this.#newRepository = new NewsRepository();
  }
  async findNews(id) {
    if (id) {
      const result = await this.#newRepository.findNewsById(id.id);
      return result;
    }
    else return {
      message: "Id news not null",
      data: [],
      code: ''
    }
  }

  async saveNews(news) {
    if (this.validate()) {
      const result = await this.#newRepository.saveNews(news);
      return result;
    }
    else return {
      message: "error",
      code: "",
      data: []
    }

  }

  async deleteNews(id) {
    if (id && id.id) {
      const result = await this.#newRepository.deleteNewsById(id.id);
      return result;
    }
    else {
      return {
        message: "Không tìm thấy id bài viết",
        code: '',
        dâta: []
      }
    }
  }

  async getTop20News() {
    const result = await this.#newRepository.getAllNews();
    return result;
  }

  searchNews(keyword) {

  }

  validate() {
    return true;
  }
}

export default NewsService;