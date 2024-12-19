import jwt from 'jsonwebtoken';

// Middleware để xác thực token
const authenticateToken = (req, res, next) => {
  const token = req.cookies['authToken'];
  // Kiểm tra xem token có tồn tại hay không
  if (!token) {
    return res.status(401).json({ message: 'Access Token Required' });
  }

  // Xác thực token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    // Lưu thông tin user vào req.user để dùng trong các middleware sau
    req.user = user;
    next();
  });
};

// Middleware để kiểm tra quyền admin
const adminAuthentication = (req, res, next) => {
  // Kiểm tra xem user đã được xác thực chưa
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Kiểm tra xem user có phải là admin hay không
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin only' });
  }

  next();
};
// Kiểm tra cookie và thêm vào res.locals
function checkLogin(req, res, next) {
  res.locals.isLoggedIn = req.cookies.isLoggedIn || false;
  res.locals.username = req.cookies.username || null;
  res.locals.currentPage = null;
  next();
}

export {
  authenticateToken,
  adminAuthentication,
  checkLogin
};
