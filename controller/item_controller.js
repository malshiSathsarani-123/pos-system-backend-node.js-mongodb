const Item = require('../model/item')

const saveItem = async (req,res) => {
    try {
        const lastItem = await Item.findOne({}, {}, { sort: { product_code: -1 } });
        let newId = "P001";

        if (lastItem) {
            const lastIdNum = parseInt(lastItem.product_code.slice(1), 10);
            const nextIdNum = lastIdNum + 1;
            newId = `P${nextIdNum.toString().padStart(3, '0')}`;
        }
        const newItem = new Item({
            product_code:newId,
            description:req.body.description,
            unit_price:req.body.unit_price,
            in_stock:req.body.in_stock,
            additional_info:req.body.additional_info,
        });

        await newItem.save();
        res.status(200).json({ message: `Item ${newId} saved successfully!`})
    }catch (error){
        res.status(500).json({ error: error.message });
    }
}

const getItem = async(req,res) =>{
    try {
        let response = await  Item.find();
        res.status(200).json({ response });
    }catch (error){
        res.status(500).json({ error: error.message })
    }
}


exports.saveItem = saveItem;
exports.getItem = getItem;