import React from "react";
import {
  Button, Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input, Stack,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;

  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
};

export const ServiceDrawer = ({ isOpen, onClose, btnRef }: Props) => (
  <Drawer
    isOpen={isOpen}
    placement="right"
    onClose={onClose}
    finalFocusRef={btnRef}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Create your account</DrawerHeader>

      <DrawerBody>
        <Input placeholder="Type here..." />
      </DrawerBody>

      <DrawerFooter>
        <Stack direction="row">
          <Button variant="ghost" colorScheme="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="primary">Save</Button>
        </Stack>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
