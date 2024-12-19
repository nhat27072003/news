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
  async getNewsDetail(id) {
    if (id) {
      // Lấy bài viết chi tiết
      const result = await this.#newRepository.findNewsById(id.id);

      // Kiểm tra nếu bài viết có dữ liệu và có category
      if (result && result.data && result.data.category) {
        // Lấy các bài viết liên quan dựa trên category của bài viết
        const relatedNews = await this.#newRepository.findNewsByCategory(result.data.category);
        // Trả về đối tượng bao gồm bài viết chi tiết và bài viết liên quan
        return {
          data: {
            news: result.data,
            relatedNews: relatedNews.data || []  // Nếu không có bài viết liên quan thì trả về mảng rỗng
          },
          message: "Success",
          code: "200"
        };
      } else {
        return {
          message: "News not found or category is missing",
          data: [],
          code: "404"
        };
      }
    } else {
      return {
        message: "Id news cannot be null",
        data: [],
        code: "400"
      };
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

  async getAllNews() {
    const result = await this.#newRepository.getAllNews();
    return result;
  }
  async getNewsest() {
    const result = await this.#newRepository.getNewsest();
    return result;
  }
  async getNewsByCategory(category) {
    const result = await this.#newRepository.findNewsByCategory(category);
    return result;
  }
  async searchNews(keyword) {
    const result = await this.#newRepository.searchNews(keyword);
    return result;
  }

  validate() {
    return true;
  }
}

export default NewsService;