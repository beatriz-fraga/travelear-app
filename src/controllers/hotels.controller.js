import { HotelRepository } from "../repositories/hotel.repository.js";

export class HotelController {
  static instance;
  constructor() {
    this.repository = new HotelRepository();
  }

  getAllHotels = async (req, res) => {
    const allHotels = await this.repository.getAllHotels();
    return res.json(allHotels);
  };

  createHotel = async (req, res) => {
    const hotel = req.body;

    const createdHotel = await this.repository.createHotel(hotel);

    return res.json(createdHotel);
  };

  updateHotel = async (req, res) => {
    const id = Number(req.params.id);
    const hotel = req.body;

    const hotelUpdated = await this.repository.updateHotel({ id, ...hotel });

    return res.json(hotelUpdated);
  };

  deleteHotel = async (req, res) => {
    const id = Number(req.params.id);

    await this.repository.deleteHotel(id);

    return res.json({ ok: true });
  };
}
