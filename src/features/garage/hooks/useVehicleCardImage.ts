import type { VehicleType } from "~/features/garage/types/vehicle";

type VehicleImage = {
  type: VehicleType;
  imageSrc: string;
};

const VEHICLE_IMAGES: VehicleImage[] = [
  {
    type: "bike",
    imageSrc: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    type: "car",
    imageSrc: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    type: "motorbike",
    imageSrc: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
];

export function useVehicleCardImage(type: string | null) {
  const result = VEHICLE_IMAGES.find((_image) => _image.type === type);
  return result?.imageSrc;
}
