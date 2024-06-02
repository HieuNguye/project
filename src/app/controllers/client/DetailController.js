const Database = require("../../config/database");

class DetailController {
    constructor() {
        this.db = Database;
    }

    detail = async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `select * from giay where id = ?`;
            const results = await this.db.query(sql, [id]);
            if (results) {
                res.status(200).json({
                    data: results[0],
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

    listSame = async (req, res) => {
        try {
            const { id } = req.params;
            const sql = `select giay.MaLGiay from giay where id = ?`;
            const results = await this.db.query(sql, [id]);
           
            if (results[0].MaLGiay > 0) {
                const getSame = `select * from giay where MaLGiay = ?`;
                const exGetSame = await this.db.query(getSame, [results[0].MaLGiay]);
     
                if (exGetSame.length > 0) {
                    res.status(200).json({
                        data: exGetSame,
                    });
                }
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

module.exports = new DetailController();
