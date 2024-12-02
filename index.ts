
import express,{Express} from "express";
import dotenv from "dotenv"
import * as database from "./config/database";
import routeClient from "./routes/client/index.route";
// import cors from "cors";
// routes


dotenv.config();
database.connect();
const app:Express = express();
const port:string|number = process.env.PORT||3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);

app.set("view engine", "pug");
// app.use(cors({
//     methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// Routes client side
routeClient(app);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
