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
import * as yup from "yup";

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
  const validationSchema = React.useMemo(
    () => yup.object().shape({
      name: yup
        .string()
        .required(t("garage.vehicle.serviceDrawer.createForm.name.required") || "Error")
        .min(3, t("garage.vehicle.serviceDrawer.createForm.name.minLength") || "Error"),
      description: yup
        .string(),
      price: yup.number()
        .required(t("garage.vehicle.serviceDrawer.createForm.price.required") || "Error")
        .min(0, t("garage.vehicle.serviceDrawer.createForm.price.minValue") || "Error"),
    }),
    [t],
  );

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={() => {}}
          validationSchema={validationSchema}
          validateOnMount
        >
          {(isValid) => (
            <Form>
              <DrawerCloseButton />
              <DrawerHeader>{t("garage.vehicle.serviceDrawer.title")}</DrawerHeader>
              <DrawerBody>
                <Flex direction="column" gap={4}>
                  <Box width={["xs", "md"]} height="64px">
                    <Field
                      as={Input}
                      type="text"
                      name="name"
                      placeholder={t("garage.vehicle.serviceDrawer.createForm.name.placeholder")}
                    />
                    <ErrorMessage component="div" name="name" />
                  </Box>
                  <Box width={["xs", "md"]} height="64px">
                    <Field
                      as={Input}
                      type="text"
                      name="description"
                      placeholder={t("garage.vehicle.serviceDrawer.createForm.description.placeholder")}
                    />
                    <ErrorMessage component="div" name="description" />
                  </Box>
                  <Box width={["xs", "md"]} height="64px">
                    <Field
                      as={Input}
                      type="text"
                      name="price"
                      placeholder={t("garage.vehicle.serviceDrawer.createForm.price.placeholder")}
                    />
                    <ErrorMessage component="div" name="price" />
                  </Box>
                </Flex>
              </DrawerBody>

              <DrawerFooter>
                <Stack direction="row">
                  <Button variant="ghost" colorScheme="primary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="primary"
                    isDisabled={!isValid}
                  >
                    Save
                  </Button>
                </Stack>
              </DrawerFooter>
            </Form>
          )}
        </Formik>
      </DrawerContent>
    </Drawer>
  );
};
