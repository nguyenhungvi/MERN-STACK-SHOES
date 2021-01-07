require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 4000;
const {
    auth,
    category,
    product,
    order,
    cart,
    review,
} = require("./routes/index");

//khai báo thư viện mongooses
const mongoose = require("mongoose");
//chuỗi kết nối
const strConn = "mongodb://localhost/DBShoes";
//cấu hình kết nối ts mongoDB
mongoose.connect(
    strConn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log(`Connect error: ${err}`);
        } else {
            console.log("Connect success!!");
        }
    }
);

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", auth);
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/cart", cart);
app.use("/api/review", review);

app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Server is running!!",
    });
});

app.use((req, res, next) => {
    const error = new Error("Not found!!!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server is running with PORT=${PORT}`);
});