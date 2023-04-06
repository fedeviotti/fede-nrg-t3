import React from "react";
import { useRouter } from "next/router";

const VehicleMaintenance = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      Vehicle Maintenance
      {" "}
      {id}
    </div>
  );
};

export default VehicleMaintenance;
