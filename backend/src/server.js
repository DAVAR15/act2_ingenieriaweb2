require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`[API-SERVER] Activo y ejecutándose en el puerto ${PORT}`);
    });
};

startServer();
