const Database = require("../../config/database");

class HomeController {
    constructor() {
        this.db = Database;
    }

    listNew = async (req, res) => {
        try {
            const sql = `select * from giay order by id desc limit 8`;
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
    }



    getListCategoryHang = async (req, res) => {
        try {
            const sql = `SELECT * from loaigiay limit 6`;
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
}


module.exports = new HomeController();
