require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Routers
const regionRoutes = require("./routes/region.routes");
const categoryRoutes = require("./routes/category.routes");
const unitRoutes = require("./routes/unit.routes");
const warehouseRoutes = require("./routes/warehouse.routes");
const productRoutes = require("./routes/product.routes");
const seedRoutes = require("./routes/seed.routes");
const userRoutes = require("./routes/user.routes");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sklad API",
      version: "1.0.0",
      description: "API for Warehouses and Products",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount Routes
app.use("/api/users", userRoutes);
app.use("/api/regions", authMiddleware, regionRoutes);
app.use("/api/categories", authMiddleware, categoryRoutes);
app.use("/api/units", authMiddleware, unitRoutes);
app.use("/api/warehouses", authMiddleware, warehouseRoutes);
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/seed", seedRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected and synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.log("Error syncing db: ", err));

module.exports = app;
