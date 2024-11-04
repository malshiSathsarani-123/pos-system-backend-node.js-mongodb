const Customer = require('../model/customer');

const saveCustomer = async (req, res, next) => {
    try {
        const lastCustomer = await Customer.findOne({}, {}, { sort: { id: -1 } });
        let newId = "C001";

        if (lastCustomer) {
            const lastIdNum = parseInt(lastCustomer.id.slice(1), 10);
            const nextIdNum = lastIdNum + 1;
            newId = `C${nextIdNum.toString().padStart(3, '0')}`;
        }

        const newCustomer = new Customer({
            id: newId,
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
        });

        const response = await newCustomer.save();
        res.status(201).json({ message: "Customer saved successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCustomer = async (req, res, next) => {
    try {
        const response = await Customer.find();
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCustomer = async (req, res, next) => {
    try {
        const { id, name, email, contact } = req.body;

        const response = await Customer.updateOne(
            { id: id },
            { $set: { name: name, email: email, contact: contact } }
        );

        res.json({ message: "Customer updated successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.body;

        const response = await Customer.deleteOne({ id: id });
        res.json({ message: "Customer deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCustomer = getCustomer;
exports.saveCustomer = saveCustomer;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;
