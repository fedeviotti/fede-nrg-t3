import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bike = await prisma.vehicleType.create({
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

  // NOTE: add manually ownerId that is created when a user is created
  const rockrider = await prisma.vehicle.create({
    data: {
      name: "Rockrider ST 540",
      description: "MTB",
      typeId: bike.id,
    },
  });

  const elops = await prisma.vehicle.create({
    data: {
      name: "Elops",
      description: "City bike",
      typeId: bike.id,
    },
  });

  await prisma.vehicle.create({
    data: {
      name: "Giant",
      description: "MTB Front Full Carbon",
      typeId: bike.id,
    },
  });

  await prisma.service.create({
    data: {
      name: "Manutenzione pedale",
      description: "Fissaggio pedale dopo che si è staccato due volte",
      vehicleId: rockrider.id,
    },
  });

  await prisma.service.create({
    data: {
      name: "Cambio gomme",
      description: "Messo gomme tubeless",
      vehicleId: rockrider.id,
    },
  });

  await prisma.service.create({
    data: {
      name: "Check annuale",
      description: "Controllo annuale gratuito entro il primo anno",
      vehicleId: elops.id,
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
