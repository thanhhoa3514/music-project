
import express,{Express} from "express";
import dotenv from "dotenv"
import * as database from "./config/database";
// import cors from "cors";
// routes
// import mainV1Routes from "./api/v1/routes/index.route"

dotenv.config();
database.connect();
const app:Express = express();
const port:string|number = process.env.PORT||3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
// app.use(cors({
//     methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// mainV1Routes(app);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
