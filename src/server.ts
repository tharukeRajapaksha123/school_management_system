import express from "express"
import http from "http"
import { isError } from "joi"
import mongoose from "mongoose"
import Logging from "./libraries/logging"


const db_url = "mongodb://localhost:27017/student_management_system"
const port = 8080
const router = express();

//controllers
const assaigment_controller = require("./controllers/assaigment_controller")
const submission_controller = require("./controllers/submission_controller")
const class_controller = require("./controllers/class_controller")
const enrollment_controller = require("./controllers/enrollemt_controller")
mongoose.connect(db_url)
    .then(() => {
        Logging.info("MONGO DBD CONNECTED")
        StartServer()
    })
    .catch(err => Logging.error(err))

const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use("/assaigment-controller", assaigment_controller)
    router.use("/submission-controller",submission_controller)
    router.use("/class-controller",class_controller)
    router.use("/enrollment-controller",enrollment_controller)
    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(port, () => Logging.info(`Server is running on port ${port}`));
}