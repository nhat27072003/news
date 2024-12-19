import User from "../entities/User.js";
import NewsService from "../services/NewsSevice.js";
import UserService from "../services/UserService.js";
import bcrypt from 'bcryptjs'
class AdminController {
  constructor() {
    this.getManagePage = this.getManagePage.bind(this);

  }

  async getManagePage(req, res) {
    try {
      const newsController = new NewsService();
      const result = await newsController.getAllNews();

      if (result.data && result.data.newsList) {
        res.render('admin/news',
          {
            activePage: 'articles',
            newsList: result.data.newsList.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
          });
      }
      else {
        res.render('admin/news',
          {
            activePage: 'articles',
            newsList: []
          });
      }
    } catch (err) {
      res.render('admin/news',
        {
          activePage: 'articles',
          newsList: []
        });
    }
  }

  async getManageUser(req, res) {
    try {
      const userService = new UserService();
      const result = await userService.getAllUser();
      console.log(result.data)
      res.render('admin/user', { activePage: 'users', users: result.data });
    } catch (err) {
      res.status(500).send('Lỗi khi tải trang quản lý.');
    }
  }
  async getAddNewsPage(req, res) {
    res.render('admin/addNews', { activePage: 'articles' })
  }

  async getAddUserPage(req, res) {
    res.render('admin/addUser', { activePage: 'users' })
  }
  async addUser(req, res) {
    const { username, email, role, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    try {
      const newUser = new User({
        username,
        email,
        role,
        password: hashPass,
      });

      await newUser.save();
      res.redirect('/admin/user');
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).send('Đã xảy ra lỗi khi thêm người dùng.');
    }
  }
  async getEditUserPage(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send('Người dùng không tồn tại.');
      }
      res.render('admin/editUser', { activePage: 'users', user })
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Đã xảy ra lỗi.');
    }
  }
  async editUser(req, res) {
    const { username, email, role, password } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send('Người dùng không tồn tại.');
      }

      user.username = username;
      user.email = email;
      user.role = role;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();
      res.redirect('/admin/user');
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Đã xảy ra lỗi khi cập nhật người dùng.');
    }
  }
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('Người dùng không tồn tại.');
      }
      await User.findByIdAndDelete(userId);
      res.redirect('/admin/user');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Đã xảy ra lỗi khi xóa người dùng.');
    }
  }
}


export default AdminController