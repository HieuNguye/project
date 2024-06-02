const Database = require("../../config/database");

class ProductController {
    constructor() {
        this.db = Database;
    }

    lists = async (req, res) => {
        try {
            const sql = `select * from giay order by id`;
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

            const sql = `SELECT * from giay where id = '${id}'`;
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

    getListCategory = async (req, res) => {
        try {
            const sql = `SELECT * from loaigiay `;
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

    create = async (req, res) => {
        try {
            const giay = req.body;

            const query = `INSERT INTO giay (TenGiay, MaLGiay, HinhAnh,MoTa,GiaTB)
        VALUES (?, ?, ?,?, ?)`;

            const excute = await this.db.query(query, [
                giay.TenGiay,
                giay.MaLGiay,
                giay.HinhAnh,
                giay.MoTa,
                giay.GiaTB
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
            const giay = req.body;
            const del = `DELETE FROM giay WHERE id = '${giay.id}'`;
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
            const giay = req.body;


            const query = `UPDATE giay SET
            TenGiay = ?,
            MaLGiay = ?,
            HinhAnh = ?,
            MoTa = ?,
            GiaTB = ?
                  WHERE id = ?`;

            const excute = await this.db.query(query, [
                giay.TenGiay,
                giay.MaLGiay,
                giay.HinhAnh,
                giay.MoTa,
                giay.GiaTB,
                giay.id

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

module.exports = new ProductController();
