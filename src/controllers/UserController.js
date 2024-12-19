import UserService from "../services/UserService.js";

class UserController {

  #userService;

  constructor() {
    this.#userService = new UserService();
    this.deleteUser = this.deleteUser.bind(this);
    this.signupAccount = this.signupAccount.bind(this);
    this.login = this.login.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  async deleteUser(req, res) {
    try {
      const { userId } = req.body;
      if (userId) {
        const result = await this.#userService.deleteUser(userId);
        res.status(200).json(result);
      }
      else {
        res.status(200).json({

        })
      }
    }
    catch (error) {
      console.log(error)
      res.status(200).json({
        message: "Fail",
        data: [],
        code: ''
      })
    }
  }

  async signupAccount(req, res) {
    try {
      const { username, email, password, confirmPassword } = req.body;
      if (password != confirmPassword) {
        res.status(200).json({
          code: '',
          data: [],
          message: 'Nhập lại mật khẩu không khớp!'
        })
      } else {
        if (username && password) {
          const result = await this.#userService.signupAccount({ username, password });
          if (result) {
            res.redirect('login')
          }
        } else {
          res.status(200).json({
            code: '',
            data: [],
            message: 'Thiếu username hoặc password!'
          })
        }
      }
    }
    catch (error) {
      res.status(200).json({

      })
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const result = await this.#userService.login(username, password);
      if (result.data != null && result.code == '1000' && result.data.token) {
        res.cookie('authToken', result.data.token, {
          httpOnly: true,
          maxAge: 3600000
        });
        res.cookie('isLoggedIn', true, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        res.cookie('username', username, { maxAge: 24 * 60 * 60 * 1000 });
        if (result.data.role === 'user') {
          res.redirect('/');
        } else if (result.data.role === 'admin') {
          res.redirect('/admin/news');
        }
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Đăng nhập thất bại'
      });
    }
  }
  async logout(req, res) {
    res.clearCookie('authToken')
    res.clearCookie('isLoggedIn');
    res.clearCookie('username');
    res.redirect('/');
  }

  async getAllUser(req, res) {
    try {
      const result = await this.#userService.getAllUser();
      res.status(200).json(result);
    }
    catch (error) {
      console.log(error)
      res.status(200).json({
        message: "Error",
        data: [],
        code: ''
      })
    }
  }
}

export default UserController;