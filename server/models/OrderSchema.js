const mongoose = require('mongoose');

const medicineOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  medicines: [
    {
      medicineId: {
        type: Number,
      },
      medicineName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      medicineType: {
        type: String,
        required: true,
      },
      packaging: {
        type: String,
      },
      MRP: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryStatus: {
    type: Boolean,
    default: false
  },
  cancelOrder: {
    type: Boolean,
    default: false
  }
});

const MedicineOrder = mongoose.model('MedicineOrder', medicineOrderSchema);

module.exports = MedicineOrder;
