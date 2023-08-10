import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // VehicleTypes
  await prisma.vehicleType.create({
    data: {
      name: "bike",
      description: "Bycicle",
    },
  });
  await prisma.vehicleType.create({
    data: {
      name: "car",
      description: "Car",
    },
  });
  await prisma.vehicleType.create({
    data: {
      name: "motorbike",
      description: "Motorbike",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
