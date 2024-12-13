import NewsService from "../services/NewsSevice.js";

class NewsController {
  #newService;

  constructor() {
    this.#newService = new NewsService();
    this.createNews = this.createNews.bind(this);
    this.getTop20News = this.getTop20News.bind(this);
    this.getNewsDetails = this.getNewsDetails.bind(this);
    this.deleteNews = this.deleteNews.bind(this);
  }

  async getTop20News(req, res) {
    try {
      const result = await this.#newService.getTop20News();

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error saving news' });
    }
  }

  async getNewsDetails(req, res) {
    try {
      const id = req.params;
      const result = await this.#newService.findNews(id);
      res.status(200).json(result)
    }
    catch (error) {
      res.status(200).json({
        message: "Error",
        code: '',
        data: []
      })
    }
  }

  editNews(news) {

  }

  searchNews(keyword) {
  }

  async createNews(req, res) {
    const { title, content, author } = req.body;
    try {
      const result = await this.#newService.saveNews({ title, content, author });

      res.status(200).json({ message: result.message })
    } catch (error) {
      console.error('Error saving news:', error);
      res.status(500).json({ message: 'Error saving news' });
    }
  }

  async deleteNews(req, res) {
    try {
      const id = req.params;
      const result = await this.#newService.deleteNews(id);

      res.status(200).json(result);
    }
    catch (error) {
      res.status(200).json({
        message: "error",
        data: [],
        code: ''
      });
    }

  }

}

export default NewsController;