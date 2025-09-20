// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

app.get('/', (req, res) => {
    res.render('index'); // file views/index.ejs
});

app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// ==========================
// Swagger setup
// ==========================
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product-Supplier API',
            version: '1.0.0',
            description: 'API CRUD cho Product và Supplier',
        },
        servers: [{
            url: `http://localhost:${process.env.PORT || 3000}`,
        }, ],
    },
    apis: ['./routes/*.js'], // Swagger sẽ quét comment trong routes
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ==========================
// MongoDB connection
// ==========================
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product_supplier_db';
mongoose.connect(mongoUri)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error(err));

// ==========================
// Start server
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📖 Swagger docs: http://localhost:${PORT}/api-docs`);
});