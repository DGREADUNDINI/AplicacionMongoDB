import app from "./app.js";
import "./database.js";

// Server is listening
app.listen(app.get("port"));

console.log("Server on port", app.get("port"));
console.log("Environment:", process.env.NODE_ENV); //si hay una variable llamada node_env utiliza esa variable
                                                    //podria ser .PORT