import News from "../entities/News.js";
import NewsService from "../services/NewsSevice.js";

class NewsController {
  #newService;

  constructor() {
    this.#newService = new NewsService();
    this.createNews = this.createNews.bind(this);
    this.getTop20News = this.getTop20News.bind(this);
    this.getNewsDetails = this.getNewsDetails.bind(this);
    this.deleteNews = this.deleteNews.bind(this);
    this.searchNews = this.searchNews.bind(this);
    this.getEditNews = this.getEditNews.bind(this);
    this.editNews = this.editNews.bind(this)
  }

  async getTop20News(req, res) {
    try {
      const result = await this.#newService.getAllNews();

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error saving news' });
    }
  }

  async getNewsDetails(req, res) {
    try {
      const id = req.params;
      const result = await this.#newService.getNewsDetail(id);
      if (result && result.data) {
        res.render('newsDetail', {
          title: result.data.news.title,
          news: result.data.news,
          relatedPosts: result.data.relatedNews
        })
      }
      else {
        res.render('newsDetail', {
          title: result.data.new.title,
          news: null,
          relatedPosts: null
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async getEditNews(req, res) {
    try {
      // Lấy bài viết theo ID từ cơ sở dữ liệu
      const news = await News.findById(req.params.id);

      // Nếu không tìm thấy bài viết, trả về lỗi
      if (!news) {
        return res.status(404).send('Bài viết không tồn tại');
      }

      // Render trang chỉnh sửa và truyền dữ liệu bài viết vào
      res.render('admin/editNews', { news, activePage: 'articles' });
    } catch (err) {
      res.status(500).send('Lỗi khi lấy dữ liệu bài viết');
    }
  }

  async editNews(req, res) {
    try {
      const { title, category, content } = req.body;
      let updateData = { title, category, content };

      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      await News.findByIdAndUpdate(req.params.id, updateData);
      res.redirect('/admin/news');
    } catch (err) {
      res.status(500).send('Lỗi khi cập nhật bài viết');
    }
  }
  async searchNews(req, res) {
    const query = req.query.q?.toLowerCase();
    if (!query) {
      return res.render('search-results', { results: [], query });
    }

    try {
      const results = await this.#newService.searchNews(query);
      res.render('search-result',
        {
          title: 'Tìm kiếm',
          results: results.data,
          query
        });
    } catch (err) {
      console.error(err);
      res.status(500).send('Lỗi server');
    }
  }

  async getNewest(req, res) {
    try {
      const result = await this.#newService.getNewsest();

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error saving news' });
    }
  }



  async createNews(req, res) {
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Lưu đường dẫn file ảnh

    try {
      const result = await this.#newService.saveNews({ title, content, category, image });

      if (result.code == 1000) {
        res.redirect('/admin/news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
      res.status(500).json({ message: 'Error saving news' });
    }
  }

  async deleteNews(req, res) {
    try {
      const id = req.params;
      const result = await this.#newService.deleteNews(id);
      if (result) {
        res.redirect('/admin/news');
      }
      else {
        res.redirect('/admin/news');
      }
    }
    catch (error) {
      res.redirect('/admin/news');

    }

  }

}

export default NewsController;