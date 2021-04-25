

const { Schema, model } = require('mongoose');

const ProductSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    desc: {
        type: String
    },
    available: {
        type: Boolean,
        default: true 
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, state, ...cat } = this.toObject();
    return cat;
}

module.exports = model('Product', ProductSchema);