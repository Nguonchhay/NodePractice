const { Category, Product } = require('./../../models');

const listCategory = async (req, res) => {
    const categories = await Category.findAll({
        include: [
            {
                model: Product,
                as: 'products'
            }
        ]
    });
    res.json(categories);
};

const storeCategory = async (req, res) => {
    const categoryData = req.body;
    Category.create(categoryData)
        .then(category => {
            res.json(category);
        })
        .catch(err => {
            res.json(err);
        });
}

const showCategory = async (req, res) => {
    const categoryId = req.params.category;
    const category = await Category.findByPk(categoryId);
    res.json(category);
}

const updateCategory = async (req, res) => {
    const categoryId = req.params.category;
    const categoryData = req.body;
    Category.update(
        categoryData,
        {
            where: {
                id: categoryId
            }
        }
    )
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    });
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.category;
    Category.destroy({
        where: {
            id: categoryId
        }
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    });
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