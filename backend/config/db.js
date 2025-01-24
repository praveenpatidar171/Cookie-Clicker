const mongoose = require('mongoose')

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_BASE_URI);
        console.log(`MongoDB is connected at ${conn.connection.host}`)

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;