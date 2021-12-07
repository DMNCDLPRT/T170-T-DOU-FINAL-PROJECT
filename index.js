const express = require('express');
const cors = require('cors');
const path = require('path');
const expressLayoutes = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const config = require('./startup/config');
const winston = require('winston');
const err = require('./middleware/errors');
const customerRoutes = require('./routes/customer-routes');
const productRoutes = require('./routes/product-routes');
const adminRoutes = require('./routes/admin-routes');
const userRoutes = require('./routes/user-routes');
const orderRoutes = require('./routes/order-routes');
const methodOverride = require("method-override");
const app = express();
const cookieParser = require('cookie-parser');
const multer = require("multer");
const flash = require("connect-flash");

require("dotenv").config();

require('./startup/db')();
require('./startup/logging')();
require('./startup/validations')();

app.use(cookieParser());
app.use(expressLayoutes);
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "/views"));
app.use(flash());

app.use(customerRoutes.routes);
app.use(productRoutes.routes);
app.use(adminRoutes.routes);
app.use(userRoutes.routes);
app.use(orderRoutes.routes)
app.use(err);

app.listen(config.port, () => winston.info('App is listening on url http://localhost:' + config.port));
