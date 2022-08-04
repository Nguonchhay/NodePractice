const { Category, Product } = require('./../../models');

const DBCategory = require('./../../models_mongoose/Category');

const listCategory = async (req, res) => {
    // const categories = await Category.findAll({
    //     include: [
    //         {
    //             model: Product,
    //             as: 'products'
    //         }
    //     ]
    // });
    // res.json(categories);
    const categories = DBCategory.find().exec((err, result) => {
        if (err) res.json(err);
        res.json(result);
    });
};

const storeCategory = async (req, res) => {
    const categoryData = req.body;
    const category = new DBCategory(categoryData);
    const newCategory = await category.save();
    res.json(newCategory);
    // Category.create(categoryData)
    //     .then(category => {
    //         res.json(category);
    //     })
    //     .catch(err => {
    //         res.json(err);
    //     });
}

const showCategory = async (req, res) => {
    const categoryId = req.params.category;
    const category = await Category.findByPk(categoryId);
    res.json(category);
}

const updateCategory = async (req, res) => {
    const categoryId = req.params.category;
    const categoryData = req.body;
    // Category.update(
    //     categoryData,
    //     {
    //         where: {
    //             id: categoryId
    //         }
    //     }
    // )
    // .then(result => {
    //     res.json(result);
    // })
    // .catch(err => {
    //     res.json(err);
    // });
    DBCategory.findOneAndUpdate(
        { _id: categoryId },
        categoryData,
        { upsert: true }
    ).then((err, doc) => {
        if (err) res.json(err)
        res.json(doc)
    });
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.category;
    // Category.destroy({
    //     where: {
    //         id: categoryId
    //     }
    // })
    // .then(result => {
    //     res.json(result);
    // })
    // .catch(err => {
    //     res.json(err);
    // });
    DBCategory.find({_id: categoryId}).remove((err) => {
        if (err) res.json(err);
        res.json({message: 'deleted'});
    })
}

const lastCategory = (req, res) => {
    Category.selectTop()
    .then(([rows]) => {
        res.json(rows);
    })
    .catch(err => {
        res.json(err);
    });
}

module.exports = {
    listCategory,
    showCategory,
    storeCategory,
    updateCategory,
    deleteCategory,
    lastCategory
}