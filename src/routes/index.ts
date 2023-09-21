import express from "express";

import building from "./building.js";
import category from "./category.js";


const routes = express.Router();

routes.use("/building", building);
routes.use("/category", category);


export default routes;
