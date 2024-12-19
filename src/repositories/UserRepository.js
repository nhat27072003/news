import User from "../entities/User.js";

class UserRepository {

  async findUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return {
          message: "User not found",
          code: "USER_NOT_FOUND",
          data: null
        };
      }
      return {
        message: "OK",
        code: "USER_FOUND",
        data: user
      };
    } catch (error) {
      logger.error("Error finding user by ID", { error, id });
      return {
        message: "Fail",
        code: "USER_FIND_FAILED",
        data: null
      };
    }
  }

  async findUserByUsername(username) {
    try {
      const user = await User.findOne({ username: username });
      return {
        message: "OK",
        code: '',
        data: user
      };
    }
    catch (error) {
      return {
        message: "Fail",
        code: '',
        data: null
      };
    }
  }

  async getAllUser() {
    try {
      const users = await User.find().select('-password');
      return {
        message: "OK",
        data: users,
        code: ''
      }
    }
    catch (error) {
      return {
        message: "error",
        data: [],
        code: ''
      }
    }
  }
  async saveUser(user) {
    try {
      const newUser = new User(user);
      const result = await newUser.save();
      return {
        message: "OK",
        code: '',
        data: result
      }
    }
    catch (error) {
      return {
        message: "Fail",
        code: '',
        data: null
      }
    }
  }

  async deleteUserById(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return {
          message: "User not found",
          code: "USER_NOT_FOUND",
          data: null
        };
      }
      return {
        message: "OK",
        code: "USER_DELETED",
        data: user
      };
    } catch (error) {
      logger.error("Error deleting user", { error, id });
      return {
        message: "Fail",
        code: "USER_DELETE_FAILED",
        data: null
      };
    }
  }
}

export default UserRepository;