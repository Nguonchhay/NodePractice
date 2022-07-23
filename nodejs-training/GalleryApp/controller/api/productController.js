const { Product, Category } = require('./../../models');

const list = async (req, res) => {
    // Product.findAll().then(products => {
    //     console.log(products);
    //     res.json(products);
    // });
    const products = await Product.findAll({
        include: [
            {
                model: Category,
                as: 'category'
            }
        ]
    });
    res.json(products);
}

const show = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
}

module.exports = {
    list,
    show
}