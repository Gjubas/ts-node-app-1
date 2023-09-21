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
import { Building } from "../types.js";

const building = express.Router();
const buildingList: Building[] = [
  { id: 3001, name: "Päärakennus", description: "" },
  { id: 3002, name: "Musiikkitalo", description: "Suomen musiikkitalo" },
  { id: 3003, name: "Keskuskirjasto", description: "Suomen isoin kirjasto" },
];

//get all buildings
building.get("/", (req: Request, res: Response) => {
  successHandler(
    req,
    res,
    buildingList,
    "Successfully read the buildings from DB"
  );
});

building.get(
  "/:id",
  validateIdObl,
  [validate],
  (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const matchingOnes = buildingList.filter((value) => value.id === id);

    if (matchingOnes.length === 1) {
      // search by primary key: should find just 1
      successHandler(
        req,
        res,
        matchingOnes[0],
        "Successfully read one building"
      );
    } else {
      requestErrorHandler(req, res, `No building found with id: ${id}`);
    }
  }
);

building.post(
  // CREATE building to DB
  "/",
  validateNameObl,
  validateDescription,
  [validate],
  (req: Request, res: Response) => {
    const newBuilding: Building = {
      id: buildingList.length + 3001, // Generate a new unique ID for the category
      name: req.body.name,
      description: req.body.description,
    };

    console.log("New Building:", newBuilding);
    buildingList.push(newBuilding);

    // You can add more check logic, but here just example of success case
    successHandler(
      req,
      res,
      newBuilding,
      `Successfully created a new building with ID: ${newBuilding.id}`
    );
  }
);

building.put(
  "/:id",
  validateIdObl,
  validateNameObl,
  [validate],
  (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    // Update the building with the provided ID using req.body data
    const building = buildingList.find(
      (building) => building.id === id
    );
    building!.name = req.body.name;
    building!.description = req.body.description;

    // You can add more check logic, but here's an example of success case
    successHandler(
      req,
      res,
      building,
      `Successfully updated building with id: ${id}`
    );
  }
);

export default building;
