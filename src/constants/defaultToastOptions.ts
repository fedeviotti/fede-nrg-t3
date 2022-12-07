import type { UseToastOptions } from "@chakra-ui/react";

export const defaultToastOptions: Pick<UseToastOptions, "position" | "duration" | "isClosable"> = {
  position: "bottom-right",
  duration: 3500,
  isClosable: true,
};
