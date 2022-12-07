import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const garageRouter = router({
  getVehiclesByOwner: protectedProcedure
    .input(z.object({ ownerId: z.string().nullish() }))
    .query(({ ctx, input }) => ctx.prisma.vehicle.findMany({
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
  insertVehicle: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().nullish(),
      typeId: z.number(),
      ownerId: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.vehicle.create({ data: input })),
});
