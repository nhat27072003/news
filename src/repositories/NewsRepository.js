import News from "../entities/News.js";

class NewsRepository {

  async findNewsById(id) {
    try {
      console.log('check id repo', id)
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

  async saveNews(news) {
    try {
      const newsRepo = new News(news);
      await newsRepo.save();
      return {
        message: "OK",
        code: "",
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

  async getAllNews() {
    try {
      const newsList = await News.aggregate([
        {
          $project: {
            title: 1,
            content: { $substr: ["$content", 0, 50] },
            author: 1,
            createdAt: 1,
          },
        },
      ]);
      console.log('ckeck list', newsList);
      return {
        message: "OK",
        code: '',
        data: newsList
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
}

export default NewsRepository 