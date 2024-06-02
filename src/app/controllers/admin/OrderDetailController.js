const Database = require("../../config/database");

class OrderDetailController {
    constructor() {
        this.db = Database;
    }

    lists = async (req, res) => {
        try {
            const {id} = req.params;
            const sql = `select * from chitiethdb
            inner join giay on chitiethdb.MaGiay = giay.id
            where MaDonHang = ?
             order by MaDonHang`;
            const results = await this.db.query(sql, [id]);
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
            const billDetail = req.params;

            const sql = `SELECT * from chitiethdb where MaDonHang = ? and MaNguoiDung = ?`;
            const data = await this.db.query(sql, [billDetail.MaDonHang, billDetail.MaNguoiDung]);
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




    delete = async (req, res) => {
        try {
            const OrderDetail = req.body;
            const del = `DELETE FROM chitiethdb
             
              WHERE MaDonHang = '${OrderDetail.MaDonHang}'`;
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

module.exports = new OrderDetailController();
