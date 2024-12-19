import UserRepository from "../repositories/UserRepository.js";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
class UserService {
  #userRepository;
  #JWT_SECRET;
  constructor() {
    this.#userRepository = new UserRepository();
    dotenv.config();
    this.#JWT_SECRET = process.env.JWT_SECRET;
  }
  async login(username, password) {
    const user = await this.#userRepository.findUserByUsername(username);
    if (user.data) {
      const isMatch = await bcrypt.compare(password, user.data.password);
      if (isMatch) {
        const token = this.setToken(user.data);
        return {
          message: 'OK',
          code: '1000',
          data: {
            token: token,
            role: user.data.role
          }
        }
      } else {
        return {
          message: "Tài khoản mật khẩu không đúng",
          data: [],
          code: ''
        }
      }

    } else {
      return {
        message: "username not exist.",
        data: [],
        code: ''
      }
    }
  }

  setToken(user) {
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role
    };

    const token = jwt.sign(payload, this.#JWT_SECRET, { expiresIn: '24h' });

    return token;
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.#JWT_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async signupAccount({ username, password }) {
    const user = await this.#userRepository.findUserByUsername(username);
    if (user.data) {
      return {
        message: "user already exist!",
        code: '',
        data: []
      }
    }
    else {
      const hassPass = await this.hashPassword(password);
      const result = await this.#userRepository.saveUser({ username, password: hassPass });
      return result;
    }
  }


  async findUserById(id) {
    if (id) {
      const result = await this.#userRepository.findUserById(id);
      return result;
    }
    else {
      return {
        message: 'id user not null',
        data: [],
        code: ''
      }
    }
  }

  async deleteUser(id) {
    if (id) {
      const user = await this.findUserById(id);
      if (user.data) {
        const result = await this.#userRepository.deleteUserById(id);
        return result;
      }
      else {
        return {
          message: "user not found",
          code: '',
          data: []
        }
      }
    } else {
      return {
        message: "id not null",
        data: [],
        code: ''
      }
    }
  }

  async getAllUser() {
    const users = await this.#userRepository.getAllUser();
    return users;
  }
  validateUser() {

  }
  async hashPassword(password) {
    const hashPass = await bcrypt.hash(password, 10);
    return hashPass;
  }
}

export default UserService;