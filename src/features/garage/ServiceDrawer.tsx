import React from "react";
import {
  Button, Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  Field, Form, Formik,
} from "formik";
import * as yup from "yup";
import { trpc } from "~/utils/trpc";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
  vehicleId: number;
};

type ServiceFormValues = {
  name: string;
  description: string;
  price: string;
};

const INITIAL_VALUES: ServiceFormValues = {
  name: "",
  description: "",
  price: "0",
};

export const ServiceDrawer = ({
  isOpen, onClose, btnRef, vehicleId,
}: Props) => {
  const { t } = useTranslation("common");
  const utils = trpc.useContext();
  const insertService = trpc.garage.insertService.useMutation({
    onSuccess: () => {
      utils.garage.getServicesByVehicleId.invalidate({ id: vehicleId });
      onClose();
    },
  });

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
        .min(0.01, t("garage.vehicle.serviceDrawer.createForm.price.minValue") || "Error"),
    }),
    [t],
  );

  const onSubmitHandler = React.useCallback((values: ServiceFormValues) => {
    insertService.mutate({
      ...values,
      price: Number(values.price),
      vehicleId,
    });
  }, [insertService, vehicleId]);

  return (
    <Drawer
      size="sm"
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
        validateOnMount
      >
        {({ isValid, errors, touched }) => (
          <Form>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{t("garage.vehicle.serviceDrawer.title")}</DrawerHeader>
              <DrawerBody>
                <Flex direction="column" gap={4}>
                  <FormControl isInvalid={!!touched.name && !!errors.name} isRequired>
                    <FormLabel>{t("garage.vehicle.serviceDrawer.createForm.name.label")}</FormLabel>
                    <Field as={Input} type="text" name="name" />
                    {!!touched.name && !!errors.name
                      ? <FormErrorMessage>{errors.name}</FormErrorMessage>
                      : <FormHelperText>{t("garage.vehicle.serviceDrawer.createForm.name.helper")}</FormHelperText>}
                  </FormControl>
                  <FormControl isInvalid={!!touched.description && !!errors.description}>
                    <FormLabel>{t("garage.vehicle.serviceDrawer.createForm.description.label")}</FormLabel>
                    <Field as={Input} type="text" name="description" />
                    {!!touched.description && !!errors.description
                      ? <FormErrorMessage>{errors.description}</FormErrorMessage>
                      : null}
                  </FormControl>
                  <FormControl isInvalid={!!touched.price && !!errors.price} isRequired>
                    <FormLabel>{t("garage.vehicle.serviceDrawer.createForm.price.label")}</FormLabel>
                    <NumberInput>
                      <Field as={NumberInputField} name="price" />
                    </NumberInput>
                    {!!touched.price && !!errors.price
                      ? <FormErrorMessage>{errors.price}</FormErrorMessage>
                      : <FormHelperText>{t("garage.vehicle.serviceDrawer.createForm.price.helper")}</FormHelperText>}
                  </FormControl>
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
            </DrawerContent>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};
