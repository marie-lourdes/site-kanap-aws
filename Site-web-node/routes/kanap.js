const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../PUBLIC/KANAP-PUBLIC/html/index.html"))

});
router.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, "../PUBLIC/KANAP-PUBLIC/html/product.html"))
});
router.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, "../PUBLIC/KANAP-PUBLIC/html/cart.html"))
});
router.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, "../PUBLIC/KANAP-PUBLIC/html/confirmation.html"))
});

module.exports = router;