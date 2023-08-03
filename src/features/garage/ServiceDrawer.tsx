import React from "react";
import {
  Box,
  Button, Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay, Flex, Input,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  ErrorMessage, Field, Form, Formik,
} from "formik";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
};

const INITIAL_VALUES = {
  name: "",
  description: "",
  price: 0,
};

export const ServiceDrawer = ({ isOpen, onClose, btnRef }: Props) => {
  const { t } = useTranslation("common");
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t("garage.vehicle.service_drawer.title")}</DrawerHeader>

        <DrawerBody>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={() => {}}
          >
            <Form>
              <Flex direction="column" gap={4}>
                <Box width={["xs", "md"]} height="64px">
                  <Field as={Input} type="text" name="name" placeholder={t("garage.vehicle.service_drawer.create_form.name")} />
                  <ErrorMessage component="div" name="name" />
                </Box>
                <Box width={["xs", "md"]} height="64px">
                  <Field as={Input} type="text" name="description" placeholder={t("garage.vehicle.service_drawer.create_form.description")} />
                  <ErrorMessage component="div" name="description" />
                </Box>
                <Box width={["xs", "md"]} height="64px">
                  <Field as={Input} type="text" name="price" placeholder={t("garage.vehicle.service_drawer.create_form.price")} />
                  <ErrorMessage component="div" name="price" />
                </Box>
              </Flex>
            </Form>
          </Formik>
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
};
