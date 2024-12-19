import News from "../entities/News.js";

class NewsRepository {

  async findNewsById(id) {
    try {
      const news = await News.findById(id);
      return {
        message: "OK",
        code: '',
        data: news
      }
    }
    catch (error) {
      console.log(error)
      return {
        message: "error",
        code: '',
        data: []
      }
    }
  }
  async findNewsByCategory(category) {
    try {
      const news = await News.find({ category: category });
      return {
        message: "OK",
        code: '',
        data: news
      }
    }
    catch (error) {
      console.log(error)
      return {
        message: "error",
        code: '',
        data: []
      }
    }
  }
  async saveNews(news) {
    try {
      const newsRepo = new News(news);
      await newsRepo.save();
      return {
        message: "OK",
        code: "1000",
        data: newsRepo
      }
    }
    catch (error) {
      return {
        message: "error",
        code: "",
        data: []
      }
    }
  }

  async deleteNewsById(id) {
    try {
      const news = await News.findByIdAndDelete(id);
      if (news) {
        return {
          message: "OK",
          code: '',
          data: news
        }
      }
      else return {
        messgae: "Không tìm thấy bài viết!",
        code: '',
        data: []
      }
    }
    catch (error) {
      return {
        message: "error",
        code: '',
        data: []
      }
    }
  }
  async searchNews(keyword) {
    try {
      const news = await News.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } }, // Tìm theo tiêu đề
          { content: { $regex: keyword, $options: 'i' } } // Tìm theo nội dung
        ]
      })
      return {
        data: news,
        message: 'ok',
        code: ''
      }
    }
    catch (error) {
      return {
        message: 'error',
        data: [],
        code: ''
      }
    }
  }
  async getAllNews() {
    try {
      const latestNews = await News.find().sort({ dateCreated: -1 }).limit(10)
      const hotNews = await News.find({ category: 'tin-nong' })
      const featuredNews = await News.find({ category: 'tin-noi-bat' })

      const newsList = await News.aggregate([
        {
          $project: {
            title: 1,
            content: 1,
            category: 1,
            comments: 1,
            dateCreated: 1,
          },
        },
      ]);
      return {
        message: "OK",
        code: '',
        data: {
          newsList,
          latestNews,
          hotNews,
          featuredNews
        }
      }
    }
    catch (error) {
      console.log(error)
      return {
        message: "error",
        code: '',
        data: []
      }
    }
  }
  async getNewsest() {
    try {
      const newestNews = await News.find().sort({ dateCreated: -1 }).limit(20);
      return {
        message: "OK",
        code: '',
        data: newestNews
      }
    }
    catch (error) {
      console.log(error)
      return {
        message: "error",
        code: '',
        data: []
      }
    }
  }

}

export default NewsRepository 