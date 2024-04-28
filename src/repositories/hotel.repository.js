import { PrismaClient } from "@prisma/client";

export class HotelRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createHotel({ name, address, img, telefone }) {
    const hotel = await this.prisma.hotel.create({
      data: {
        name,
        address,
        img,
        telefone,
      },
    });
    return hotel;
  }

  async getAllHotels() {
    const hotels = await this.prisma.hotel.findMany();
    return hotels;
  }

  async updateHotel({ id, name, address, img, telefone }) {
    const hotel = await this.prisma.hotel.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        img,
        telefone,
      },
    });

    return hotel;
  }

  async deleteHotel(id) {
    await this.prisma.hotel.delete({ where: { id } });
  }
}
