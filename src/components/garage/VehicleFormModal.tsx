import React from "react";
import {
  Button,
  Flex,
  useToast,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  Field, Form, Formik,
} from "formik";
import { defaultToastOptions } from "constants/defaultToastOptions";

type VehicleFormValues = {
  name: string;
  description: string;
  type: string;
};

const createVehicleSchema = yup.object().shape({
  name: yup
    .string()
    .required(),
  description: yup
    .string()
    .required(),
  type: yup
    .string()
    .required(),
});

const initialValues = {
  name: "",
  description: "",
  type: "",
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const VehicleFormModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation("common");
  const toast = useToast();

  const handleSubmit = React.useCallback(async (
    values: VehicleFormValues,
  ) => {
    const data = "data";
    const error = { message: "error" };
    console.log("values", values)
    /*const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          name: values.name,
          description: values.description,
          created_at: new Date(),
          updated_at: new Date(),
          is_owned: true,
          type_id: Number(values.type),
          owner_id: user?.id,
        },
      ]);*/
    if (data) {
      toast({
        title: t("garage.vehicle.create_form.toast.title"),
        description: t("garage.vehicle.create_form.toast.success"),
        status: "success",
        ...defaultToastOptions,
      });
      onClose();
    }
    if (error) {
      toast({
        title: t("garage.vehicle.create_form.toast.title"),
        description: error.message || t("garage.vehicle.create_form.toast.error"),
        status: "error",
        ...defaultToastOptions,
      });
    }
  }, [onClose, t, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createVehicleSchema}
        validateOnMount
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form id="create-vehicle">
            <ModalContent>
              <ModalHeader>{t("garage.vehicle.create_form.title")}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column" gap={4}>
                  <Field
                    as={Input}
                    name="name"
                    placeholder={t("garage.vehicle.create_form.field.name")}
                  />
                  <Field
                    as={Input}
                    name="description"
                    placeholder={t("garage.vehicle.create_form.field.description")}
                  />
                  <Field
                    as={Select}
                    name="type"
                    placeholder={t("garage.vehicle.create_form.field.type")}
                  >
                    <option value="7">Bike</option>
                    <option value="8">Car</option>
                  </Field>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  {t("garage.vehicle.create_form.button.cancel")}
                </Button>
                <Button
                  type="submit"
                  form="create-vehicle"
                  isLoading={isSubmitting}
                  isDisabled={!isValid || !dirty}
                >
                  {t("garage.vehicle.create_form.button.add")}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
