const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        min: [3, ''],
        max: [35, '']
    }
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;