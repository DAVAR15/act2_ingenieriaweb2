const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`[DATABASE] MongoDB conectado satisfactoriamente: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[DATABASE ERROR] Obeserva tu IP en Atlas o tus credenciales Mongoose: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
