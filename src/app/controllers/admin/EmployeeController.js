const Database = require("../../config/database");

class EmployeeController{
    constructor() {
        this.db = Database;
    }

    lists = async (req, res) => {
        try {
            const sql = `select * from nhanvien order by MaNV`;
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

            const sql = `SELECT * from nhanvien where MaNV = '${id}'`;
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
            const sql = `SELECT * from giay `;
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
            const Emplyee = req.body;

            const query = `INSERT INTO nhanvien (TenNV, DiaChi,SDT)
        VALUES (?, ?, ?)`;

            const excute = await this.db.query(query, [
                Emplyee.TenNV,
                Emplyee.DiaChi,
                Emplyee.SDT              
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
            const Employee = req.body;
            const del = `DELETE FROM nhanvien WHERE MaNV = '${Employee.MaNV}'`;
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
            const Employee = req.body;


            const query = `UPDATE nhanvien SET
            TenNV = ?,
            DiaChi = ?,
            SDT = ?
                  WHERE MaNV = ?`;

            const excute = await this.db.query(query, [
                Employee.TenNV,
                Employee.DiaChi,
                Employee.SDT,
                Employee.MaNV

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

module.exports = new EmployeeController();
