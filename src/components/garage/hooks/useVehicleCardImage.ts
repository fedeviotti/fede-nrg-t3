type VehicleType = "bike" | "car";

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
    imageSrc: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
];

export function useVehicleCardImage(type: string | null) {
  const result = VEHICLE_IMAGES.find((_image) => _image.type === type);
  return result?.imageSrc;
}
