

const { Schema, model } = require('mongoose');

const CategorySchema = new Schema ({
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
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, state, ...cat } = this.toObject();
    return cat;
}

module.exports = model('Category', CategorySchema);