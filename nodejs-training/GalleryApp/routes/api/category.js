/*
@swagger
components:
    schemas:
        Category:
            type: object
            required:
                - name
            properties:
                id:
                    type: integer
                    description: The auto-generated id of the book.
                name:
                    type: string
                    description: The title of your book.
            example:
                name: Water
*/

const express = require('express');
const {
    listCategory,
    showCategory,
    storeCategory,
    updateCategory,
    deleteCategory
} = require('./../../controller/api/categoryController');

const router = express.Router();

router.get('/categories', listCategory);
router.get('/categories/:category/show', showCategory);
router.post('/categories', storeCategory);
router.put('/categories/:category/update', updateCategory);
router.delete('/categories/:category/delete', deleteCategory);

module.exports = router