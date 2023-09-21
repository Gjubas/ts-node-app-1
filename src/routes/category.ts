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

//get category by id
category.get(
  "/:id",
  validateIdObl,
  [validate],
  (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const matchingOnes = categoryList.filter((value) => value.id === id);

    if (matchingOnes.length === 1) {
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
    try {
      const newCategory: Category = {
        id: categoryList.length + 2001,
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
    } catch (error) {
      const errorMessage = (error as Error).message;
      requestErrorHandler(req, res, errorMessage);
    }
  }
);

category.put(
  "/:id",
  validateIdObl,
  validateNameObl,
  [validate],
  (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);

      const category = categoryList.find((category) => category.id === id);

      if (!category) {
        throw new Error(`Category with id ${id} not found.`);
      }

      category.name = req.body.name;
      category.description = req.body.description;

      successHandler(
        req,
        res,
        category,
        `Successfully updated category with id: ${id}`
      );
    } catch (error) {
      const errorMessage = (error as Error).message;
      requestErrorHandler(req, res, errorMessage);
    }
  }
);

export default category;
