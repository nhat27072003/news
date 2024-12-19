import NewsService from "../services/NewsSevice.js";

class HomeController {
  #newService;
  constructor() {
    this.#newService = new NewsService();
    this.getHomePage = this.getHomePage.bind(this);
    this.getNewsPage = this.getNewsPage.bind(this);
    this.getLoginPage = this.getLoginPage.bind(this);
    this.getSignupPage = this.getSignupPage.bind(this);
    this.getCategoryPage = this.getCategoryPage.bind(this)
  }

  async getHomePage(req, res) {
    try {
      const result = await this.#newService.getAllNews();
      const latestNews = result?.data?.latestNews || [];
      const hotNews = result?.data?.hotNews || [];
      const featuredNews = result?.data?.featuredNews || [];

      res.render('index', {
        title: 'Trang Chủ',
        latestNews,
        hotNews,
        featuredNews
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      // Truyền giá trị mặc định nếu xảy ra lỗi
      res.render('index', {
        title: 'Trang Chủ',
        latestNews: [],
        hotNews: [],
        featuredNews: []
      });
    }
  }

  async getLoginPage(req, res) {
    res.render('login', {
      title: "Login"
    });
  }
  async getSignupPage(req, res) {
    res.render('signup', {
      title: "Đăng ký"
    })
  }
  async getCategoryPage(req, res) {
    const category = req.params.category;
    try {
      const result = await this.#newService.getNewsByCategory(category);
      const categoryTitles = {
        'tin-nong': 'Tin nóng',
        'tin-noi-bat': 'Tin nổi bật',
        'kinh-doanh': 'Kinh doanh',
        'the-thao': 'Thể thao',
        'doi-song': 'Đời sống',
        'giai-tri': 'Giải trí',
        'tin-moi': 'Tin mới'
      };
      if (category == 'tin-moi') {
        const newsest = await this.#newService.getNewsest();
        res.render('category', { title: categoryTitles[category], newsList: newsest.data, category, currentPage: category })
      }
      else
        res.render('category', { title: categoryTitles[category], newsList: result.data, category, currentPage: category });
    } catch (error) {
      console.error(error);
      res.status(500).send('Có lỗi xảy ra khi lấy danh mục.');
    }
  }

  async getNewsPage(req, res) {
    res.render('news', { title: 'hehehe' });
  }

}

export default HomeController;