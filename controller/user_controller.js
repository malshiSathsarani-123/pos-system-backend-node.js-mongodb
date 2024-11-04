const User = require('../model/user');

const saveUser = async (req, res, next) => {
    try {
        const lastUser = await User.findOne({}, {}, { sort: { id: -1 } });
        let newId = "U001";

        if (lastUser) {
            const lastIdNum = parseInt(lastUser.id.slice(1), 10);
            const nextIdNum = lastIdNum + 1;
            newId = `U${nextIdNum.toString().padStart(3, '0')}`;
        }

        const newUser = new User({
            id: newId,
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
        });

        const response = await newUser.save();
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUser = async (req, res, next) => {
    try {
        const response = await User.find();
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id, name, email, contact } = req.body;

        const response = await User.updateOne(
            { id: id },
            { $set: { name: name, email: email, contact: contact } }
        );

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.body;

        const response = await User.deleteOne({ id: id });
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = getUser;
exports.saveUsers = saveUser;
exports.updateUsers = updateUser;
exports.deleteUsers = deleteUser;
