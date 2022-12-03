import type { VehicleType } from "@prisma/client";

type TagColor = {
  type: string;
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
];

export function useTagColor(type: VehicleType) {
  const { color } = VEHICLE_IMAGES.find((_color) => _color.type === type.name) || {};
  return color || "brand";
}
