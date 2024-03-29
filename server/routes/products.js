const express= require('express')
const { getAllProducts, createProduct, updateProduct, 
    deleteProduct, getProductDetails, 
    createProductReview, 
    getProductReviews,
    deleteReview,
    getAdminProducts} = require('../controller/product')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router= express.Router()

router.route('/products').get(getAllProducts)

router.route('admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts)

router.route('/product/new')
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.route('/product/:id')
    .patch(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetails)

router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").put(isAuthenticatedUser, getProductReviews)
    .delete(isAuthenticatedUser, deleteReview)

module.exports=router