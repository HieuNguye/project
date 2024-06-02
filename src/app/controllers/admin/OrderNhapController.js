const Database = require("../../config/database");

class OrderNhapController{
    constructor() {
        this.db = Database;
    }

    lists = async (req, res) => {
        try {
            const sql = `select * from hoadonnhap inner join nhanvien on hoadonnhap.MaNV = nhanvien.MaNV inner join nhacungcap on hoadonnhap.MaNCC = nhacungcap.MaNCC order by id`;
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

            const sql = `SELECT * from hoadonnhap where id = '${id}'`;
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





   

    create = async (req, res) => {
        try {
            const OrderNhap = req.body;

            const query = `INSERT INTO hoadonnhap (MaNV, TinhTrang, NgayNhap, TongTien, MaNCC)
        VALUES (?, ?, ?, ?, ?)`;

            const excute = await this.db.query(query, [
                OrderNhap.MaNV,
                OrderNhap.TinhTrang,
                OrderNhap.NgayNhap,
                OrderNhap.TongTien,
                OrderNhap.MaNCC            
            ]);

            if (excute.insertId) {
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

    delete = async (req, res) => {
        try {
            const OrderNhap = req.body;
            const del = `DELETE FROM hoadonnhap WHERE id = '${OrderNhap.id}'`;
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

    update = async (req, res) => {
        try {
            const OrderNhap = req.body;


            const query = `UPDATE hoadonnhap SET
            MaNV = ?,
            TinhTrang = ?,
            NgayNhap = ?,
            TongTien = ?,
            MaNCC = ?
                  WHERE id = ?`;

            const excute = await this.db.query(query, [
                OrderNhap.MaNV,
                OrderNhap.TinhTrang,
                OrderNhap.NgayNhap,
                OrderNhap.TongTien,
                OrderNhap.MaNCC,
                OrderNhap.id

            ]);

            if (excute.affectedRows > 0) {
                res.status(200).json({
                    data: true,
                });
            }
            else {
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
}

module.exports = new OrderNhapController();
