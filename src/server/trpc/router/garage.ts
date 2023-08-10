import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const garageRouter = router({
  getVehicleTypes: protectedProcedure.query(({
    ctx,
  }) => ctx.prisma.vehicleType.findMany()),
  getVehiclesByOwner: protectedProcedure
    .input(z.object({ ownerId: z.string().nullish() }))
    .query(({
      ctx,
      input,
    }) => ctx.prisma.vehicle.findMany({
      where: {
        ownerId: input.ownerId,
      },
      include: {
        type: {
          select: {
            name: true,
          },
        },
      },
    })),
  getVehicleById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({
      ctx,
      input,
    }) => ctx.prisma.vehicle.findUnique({
      where: {
        id: input.id,
      },
    })),
  getServicesByVehicleId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({
      ctx,
      input,
    }) => ctx.prisma.service.findMany({
      where: {
        vehicleId: input.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })),
  insertVehicle: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().nullish(),
      typeId: z.number(),
      ownerId: z.string(),
    }))
    .mutation(({
      ctx,
      input,
    }) => ctx.prisma.vehicle.create({ data: input })),
  insertService: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().nullish(),
      price: z.number(),
      duration: z.number(),
      vehicleId: z.number(),
    }))
    .mutation(({
      ctx,
      input,
    }) => ctx.prisma.service.create({ data: input })),
});
