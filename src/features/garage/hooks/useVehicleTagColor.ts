import type { VehicleType } from "~/features/garage/types/vehicle";

type TagColor = {
  type: VehicleType;
  color: string;
};

const VEHICLE_IMAGES: TagColor[] = [
  {
    type: "bike",
    color: "green",
  },
  {
    type: "car",
    color: "orange",
  },
  {
    type: "motorbike",
    color: "red",
  },
];

export function useVehicleTagColor(type: string | null) {
  const result = VEHICLE_IMAGES.find((_color) => _color.type === type);
  return result?.color || "brand";
}
