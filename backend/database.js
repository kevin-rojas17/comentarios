const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://TOMut4mn3tPvITie:TOMut4mn3tPvITie@comedor.zhardxq.mongodb.net/?retryWrites=true&w=majority&appName=comedor');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
