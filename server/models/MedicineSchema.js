const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const medicineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    manufactures: {
        type: String
    },
    salt_composition: {
        type: String
    },
    medicine_type: {
        type: String
    },
    stock: {
        type: String
    },
    introduction: {
        type: String
    },
    benefits: {
        type: String
    },
    description: {
        type: String
    },
    how_to_use: {
        type: String
    },
    safety_advise: {
        type: String
    },
    Packaging: {
        type: String
    },
    ProductForm: {
        type: String
    },
    MRP: {
        type: Number
    },
    prescription_required: {
        type: String
    },
    Treatment: {
        type: String
    },
    Store: {
        type: String
    },
    Country: {
        type: String
    },
    address: {
        type: String
    },
    addToCart: {
        type: String
    }
});

// Create and export the model
const Medicine = mongoose.model('Medicine', medicineSchema, 'Medicines');

module.exports = Medicine;
