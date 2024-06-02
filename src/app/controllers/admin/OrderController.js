const Database = require("../../config/database");

class OrderController{
    constructor() {
        this.db = Database;
    }

    lists = async (req, res) => {
        try {
            const sql = `select * from donhangban order by MaDonHang`;
            const results = await this.db.query(sql, []);
            if (results) {
                res.status(200).json({
                    data: results,
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

    detail = async (req, res) => {
        try {
            const { id } = req.params;

            const sql = `SELECT * from donhangban where MaDonHang = '${id}'`;
            const data = await this.db.query(sql, []);
            if (data) {
                res.status(200).json({
                    data: data[0],
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



    uploadImage = async (req, res) => {
        try {
            const fileName = req.file ? req.file.filename : ""; 
            const fileurl = "http://127.0.0.1:8000/uploads/" + fileName;

            res.json({ fileurl });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                error: "Something went wrong!",
            });
        }
    };

  
    delete = async (req, res) => {
        try {
            const Order = req.body;
            const del = `DELETE FROM donhangban WHERE MaDonHang = '${Order.MaDonHang}'`;
            const exDel = await this.db.query(del, []);

            if (exDel.affectedRows > 0) {
                res.status(200).json({
                    status: true,
                    data: true,
                });
            }
            else {
                res.status(200).json({
                    status: false,
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

   
}

module.exports = new OrderController();
