import express, { Response, Request } from "express";
import {
  requestErrorHandler,
  successHandler,
} from "../responseHandler/index.js";
import {
  validate,
  validateDescription,
  validateIdObl,
  validateNameObl,
} from "../validationHandler/index.js";
import { Category } from "../types.js";

const category = express.Router();
const categoryList: Category[] = [
  {
    id: 2001,
    name: "Horror",
    description: "Feelings of fear, dread, repulsion, and terror",
  },
  {
    id: 2002,
    name: "Comedy",
    description:
      "Type of drama or other art form the chief object of which, according to modern notions, is to amuse.",
  },
  {
    id: 2003,
    name: "Action",
    description:
      "Fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots",
  },
];

//get all categories
category.get("/", (req: Request, res: Response) => {
  successHandler(
    req,
    res,
    categoryList,
    "Successfully read the categories from DB"
  );
});

category.get(
  "/:id",
  validateIdObl,
  [validate],
  (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const matchingOnes = categoryList.filter((value) => value.id === id);

    if (matchingOnes.length === 1) {
      // search by primary key: should find just 1
      successHandler(
        req,
        res,
        matchingOnes[0],
        "Successfully read one category"
      );
    } else {
      requestErrorHandler(req, res, `No category found with id: ${id}`);
    }
  }
);

category.post(
  "/",
  validateNameObl,
  validateDescription,
  [validate],
  (req: Request, res: Response) => {
    const newCategory: Category = {
      id: categoryList.length + 2001, // Generate a new unique ID for the category
      name: req.body.name,
      description: req.body.description,
    };

    console.log("New Category:", newCategory);
    categoryList.push(newCategory);

    successHandler(
      req,
      res,
      newCategory,
      `Successfully created a new category with ID: ${newCategory.id}`
    );
  }
);
category.put(
  // UPDATE existing category in DB
  "/",
  validateIdObl,
  validateNameObl,
  [validate],
  (req: Request, res: Response) => {
    const id: number = Number(req.body.id);

    // You can add more check logic, but here just example of success case
    successHandler(
      req,
      res,
      1, // Number of affected rows = updated rows
      `Successfully updated category with id: ${id}`
    );
  }
);

export default category;
