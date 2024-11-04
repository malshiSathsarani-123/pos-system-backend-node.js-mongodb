const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router'); 

const app = express();
const port = 3001;
const host = 'localhost';

const uri = 'mongodb+srv://maneeshadilshan70:maneeshadilshan70@cluster0.lbecd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors());
app.use(express.json());

const connect = async () => {
    console.log('Attempting to connect to MongoDB...');
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
};


connect();

const server = app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${server.address().port}`);
});

app.use('/api', router); 
