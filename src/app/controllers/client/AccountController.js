const Database = require("../../config/database");
// const generateToken = require("../../config/jwt/generateToken");
const bcrypt = require("bcrypt");

class AccountController {
  constructor() {
    this.db = Database;
  }

  getUserSession = async (req, res) => {
    try {
      const user = req.session.user ;
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  getCustomer = async (req, res) => {
    try {
      const { id } = req.params;
      const customer = `select * from  khachhang where MaKH = ?`;
      const execute = await this.db.query(customer, [
        id
      ]);

      if (execute.length > 0) {
        res.status(200).json({
          data: execute[0],
        });
      } else {
        res.status(200).json({
          data: execute[0],
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };


  register = async (req, res) => {
    try {
      const account = req.body;

      const hashedPassword = await bcrypt.hash(account.MatKhau, 10);

      account.MatKhau = hashedPassword;
      account.Quyen = 0;

      const query = `INSERT INTO nguoidung (TenNguoiDung, Email, MatKhau, Quyen)
        VALUES (?, ?, ?, ?)`;

      const execute = await this.db.query(query, [
        account.TenNguoiDung,
        account.Email,
        account.MatKhau,
        account.Quyen,
      ]);

      if (execute.insertId) {
        res.status(200).json({
          data: true,
        });
      } else {
        res.status(200).json({
          data: false,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  login = async (req, res) => {
    try {
      const account = req.body;


      const sql = `SELECT * FROM nguoidung WHERE Email = ?`;
      const results = await this.db.query(sql, [account.Email]);
      const resUser = results[0];


      if (resUser) {
        const isMatch = await bcrypt.compare(account.MatKhau, resUser.MatKhau);

        if (isMatch) {
          const userData = {
            MaNguoiDung: resUser.MaNguoiDung,
            TenNguoiDung: resUser.TenNguoiDung,
            Email: resUser.Email,
            Quyen: resUser.Quyen,
          };

          req.session.user = userData;

          return res.status(200).json({
            status: true,
            data: req.session.user,
          });
        } else {
          return res.status(200).json({
            status: false,
            data: req.session.user,
          });
        }
      }
      return res.status(404).json({
        error: "User not found",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  getUser = async (req, res) => {
    try {
      const nguoidung = req.session.user;

      if (nguoidung && nguoidung.MaNguoiDung > 0) {
        const sql = `SELECT * FROM nguoidung  WHERE nguoidung.MaNguoiDung = ?`;
        const results = await this.db.query(sql, [nguoidung.MaNguoiDung]);

        if (results && results.length > 0) {
          return res.status(200).json({
            status: true,
            profile: results[0],
            data: nguoidung,
          });
        }
      }

      return res.status(200).json({
        status: false,
        data: nguoidung,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  logout = async (req, res) => {
    try {
      const nguoidung = req.session.user || {};

      if (Object.keys(nguoidung).length !== 0) {
        req.session.destroy();
      }

      return res.status(200).json({
        status: false,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };

  authen = async (req, res) => {
    try {
      const nguoidung = req.body;

      const sql = `SELECT * FROM nguoidung WHERE Email = ?`;
      const results = await this.db.query(sql, [nguoidung.Email]);

      if (results.length === 0) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const resUser = results[0];

      let token = "";

      if (resUser.Quyen === "admin") {
        token = generateToken(resUser);
      }

      const isMatch = await bcrypt.compare(nguoidung.MatKhau, resUser.MatKhau);

      if (isMatch) {
        const userData = {
          MaNguoiDung: resUser.MaNguoiDung,
          TenNguoiDung: resUser.TenNguoiDung,
          Email: resUser.Email,
          Quyen: resUser.Quyen,
          Token: token,
        };
        req.session.user = userData;

        return res.status(200).json({
          status: true,
          data: req.session.user,
        });
      } else {
        return res.status(200).json({
          status: false,
          data: req.session.user,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    }
  };
}

module.exports = new AccountController();