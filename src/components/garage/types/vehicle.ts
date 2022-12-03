import type { Vehicle, VehicleType } from "@prisma/client";

export type ExtendedVehicle = Vehicle & { type: VehicleType };
