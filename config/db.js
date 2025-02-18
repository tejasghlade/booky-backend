const mongoose = require('mongoose');
const dotenv = require('dotenv')


dotenv.config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to Mongodb');
    } catch (error) {
        console.log('Could not connect to MongoDB',error);
        process.exit(1);
    }
}

module.exports = connectDB;