import { Router } from "express";
import { HotelController } from "../controllers/hotels.controller.js";

export const hotelsRouter = Router();
const hotelsController = new HotelController();

hotelsRouter.get("/", hotelsController.getAllHotels);
hotelsRouter.post("/", hotelsController.createHotel);
hotelsRouter.patch("/:id", hotelsController.updateHotel);
hotelsRouter.delete("/:id", hotelsController.deleteHotel);
