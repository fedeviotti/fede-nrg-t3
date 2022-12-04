import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { garageRouter } from "./garage";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  garage: garageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
