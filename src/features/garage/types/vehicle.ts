import type { Vehicle } from "@prisma/client";

export type VehicleType = "bike" | "car" | "motorbike";

export type ExtendedVehicle = Vehicle & { type: VehicleType };
