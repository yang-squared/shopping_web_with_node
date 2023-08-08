const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isauth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isauth, shopController.getCart);

router.post('/cart', isauth, shopController.postCart);

router.post('/cart-delete-item', isauth, shopController.postCartDeleteProducts);

router.get('/checkout', isauth, shopController.getCheckout);

router.get('/checkout/success', shopController.getCheckoutSuccess);

router.get('/checkout/cancel', shopController.getCheckout);

router.get('/orders', isauth, shopController.getOrders);

router.get('/orders/:orderId', isauth, shopController.getInvoice);

module.exports = router;    