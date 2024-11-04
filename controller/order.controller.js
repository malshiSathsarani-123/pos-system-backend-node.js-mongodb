const Order = require('../model/order');
const Customer = require('../model/customer');

const saveOrder = async (req, res, next) => {
    try {
        const customerExists = await Customer.findOne({ id: req.body.customer_id });
        if (!customerExists) {
            return res.status(400).json({ message: `${req.body.customer_id} customer does not exist.` });
        }

        const lastOrder = await Order.findOne({}, {}, { sort: { order_id: -1 } });
        let newId = "O001";

        if (lastOrder) {
            const lastIdNum = parseInt(lastOrder.order_id.slice(1), 10);
            const nextIdNum = lastIdNum + 1;
            newId = `O${nextIdNum.toString().padStart(3, '0')}`;
        }

        const newOrder = new Order({
            order_id: newId,
            amount: req.body.amount,
            date: req.body.date,
            customer_id: req.body.customer_id,
        });

        const response = await newOrder.save();
        res.status(201).json({ message: `Order placed successfully. Order id : ${newId}`  });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Duplicate order ID detected. Please try again." });
        } else {
            res.status(500).json({ error });
        }
    }
};

const getOrder = async (req, res, next) => {
    try {
        const response = await Order.find();
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteOrder = async (req, res, next) => {
    const { order_id } = req.body;

    try {
        const result = await Order.deleteOne({ order_id });
        if (result.deletedCount > 0) {
            res.json({ message: "Order deleted successfully." });
        } else {
            res.status(404).json({ message: "Order not found." });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.saveOrder = saveOrder;
exports.getOrder = getOrder;
exports.deleteOrder = deleteOrder;
