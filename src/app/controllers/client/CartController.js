const Database = require("../../config/database");

class CartController {
    constructor() {
        this.db = Database;
    }

    showCart = async (req, res) => {
        try {
            let listCart = req.session.cart;
            if (!listCart) {
                listCart = [];  
            }

            res.status(200).json({
                data: listCart,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                error: "Something went wrong!",
            });
        }
    };

    addCart = async (req, res) => {
        try {
          const cart = req.body;
      
          if (!req.session.cart) {
            req.session.cart = [];
          }
      
          const listCart = req.session.cart;
      
          let count = 0;
          let foundIndex = -1;
          if (cart.Status === 'Add') {
            for (let i = 0; i < listCart.length; i++) {
              if (listCart[i].id === cart.id) {
                listCart[i].TongTien += cart.GiaTB * cart.SoLuong;
                listCart[i].SoLuong += Number(cart.SoLuong);
                count++;
                break;
              }
            }
      
            if (count === 0) {
              const cartData = {
                id: cart.id,
                TenGiay: cart.TenGiay,
                HinhAnh: cart.HinhAnh,
                GiaTB: cart.GiaTB,
                SoLuong: cart.SoLuong,
                TongTien: cart.SoLuong * cart.GiaTB,
              };
              req.session.cart.push(cartData);
            }
          } else if (cart.Status === 'Form') {
            for (let i = 0; i < listCart.length; i++) {
              if (listCart[i].id === cart.id) {
                if (listCart[i].SoLuong == 1) {
                  foundIndex = i;
                  if (foundIndex !== -1) {
                    listCart.splice(foundIndex, 1);
                  }
                  break;
                } else {
                  listCart[i].TongTien = cart.GiaTB * cart.SoLuong;
                  listCart[i].SoLuong = Number(cart.SoLuong);
                }
                count++;
                break;
              }
            }
          } else {
            for (let i = 0; i < listCart.length; i++) {
              if (listCart[i].id === cart.id) {
                if (listCart[i].SoLuong == 1) {
                  foundIndex = i;
                  if (foundIndex !== -1) {
                    listCart.splice(foundIndex, 1);
                  }
                  break;
                } else {
                  listCart[i].TongTien -= cart.GiaTB * cart.SoLuong;
                  listCart[i].SoLuong -= Number(cart.SoLuong);
                }
                count++;
                break;
              }
            }
          }
      
          res.status(200).json({
            data: true,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            ok: false,
            error: 'Something went wrong!',
          });
        }
      };
    deleteItem = async (req, res) => {
        try {
            const cart = req.body;

            let listCart = req.session.cart;
            if (!listCart) {
                listCart = [];
            }

            let foundIndex = -1;
            for (let i = 0; i < listCart.length; i++) {
                if (listCart[i].id === cart.id) {
                    foundIndex = i;
                    break;
                }
            }

            if (foundIndex !== -1) {
                listCart.splice(foundIndex, 1);
            }

            res.status(200).json({
                data: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                error: "Something went wrong!",
            });
        }
    };

    totalMoney = async (req, res) => {
        try {
            let total = 0;
            let count = 0;
            let listCart = req.session.cart;
            if (!listCart) {
                listCart = [];
            }

            for (let i = 0; i < listCart.length; i++) {
                total += listCart[i].TongTien;
                count += 1;
            }

            res.status(200).json({
                data: total,
                count: count
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                error: "Something went wrong!",
            });
        }
    };
}

module.exports = new CartController();