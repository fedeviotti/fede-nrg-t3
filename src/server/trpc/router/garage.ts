import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const garageRouter = router({
  getVehicles: protectedProcedure
    .input(z.object({ ownerId: z.string().nullish() }))
    .query(({ ctx, input }) => {
    return ctx.prisma.vehicle.findMany({
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
    });
  }),
});
