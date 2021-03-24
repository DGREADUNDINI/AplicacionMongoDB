import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash";
import passport from "passport";
import morgan from "morgan";
import MongoStore from "connect-mongo";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createAdminUser } from "./libs/createUser.js";
import config from "./config.js";

import indexRoutes from "./routes/index.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import userRoutes from "./routes/users.routes.js";
import "./config/passport.js";

//browserify().transform("babelify", {presets: ["es2015"]});
//En el json
//"browserify": {"transform": [["babelify", { "presets": ["es2015"] }]]},

// inicio
const app = express();
createAdminUser();

// ajustes
app.set("port", config.PORT);
app.set("views", path.join(__dirname, "views"));//le decimos a node donde esta la carpeta views, concatenando dirname con views
app.engine(//se encarga de correr nuestros codigos html 
    ".hbs",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // le dice al servidor que cada vez que reciba datos los transforme a formato json
app.use(methodOverride("_method"));
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

// rutas
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);

// archivos estaticos
app.use(express.static(path.join(__dirname, "public")));//decirle a node donde esta la carpeta public

app.use((req, res) => {
    res.render("404");
});

export default app;