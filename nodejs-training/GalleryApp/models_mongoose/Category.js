const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        min: [3, ''],
        max: [35, '']
    }
});

module.exports = mongoose.model('Category', CategorySchema);