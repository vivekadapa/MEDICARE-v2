const Medicine = require('../models/MedicineSchema')


exports.getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).json({
            message: "Medicines Fetched Successfully",
            data: medicines
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


exports.createMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body)
        res.status(200).json({
            message: "Created Medicine Successfully",
            data: medicine
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


exports.updateMedicine = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        let medicine = await Medicine.findById(id);
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        medicine = Object.assign(medicine, updates);
        const updatedMedicine = await medicine.save();

        res.status(200).json({ message: "Medicine updated successfully", data: updatedMedicine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.deleteMedicine = async(req,res)=>{
    try {
        const id = req.params.id;
        const medicine = Medicine.findByIdAndDelete(id)
        res.status(200).json({
            message: "Deleted Medicine Successfully",
            data: medicine
        }) 
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
