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
import { defaultToastOptions } from "~/constants/defaultToastOptions";
import { useIsAuthenticated } from "~/hooks/useIsAuthenticated";
import { trpc } from "~/utils/trpc";

type VehicleFormValues = {
  name: string;
  description: string;
  typeId: number;
};

const vehicleSchema = yup.object().shape({
  name: yup
    .string()
    .required(),
  description: yup
    .string()
    .required(),
  typeId: yup
    .number()
    .required()
    .positive(),
});

const initialValues = {
  name: "",
  description: "",
  typeId: 0,
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const VehicleFormModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation("common");
  const sessionData = useIsAuthenticated();
  const utils = trpc.useContext();
  const insertVehicle = trpc.garage.insertVehicle.useMutation();
  const {
    data: vehicleTypes,
    isLoading: isVehicleTypesLoading,
  } = trpc.garage.getVehicleTypes.useQuery();
  const toast = useToast();

  const onSuccessHandler = React.useCallback(() => {
    utils.garage.getVehiclesByOwner.invalidate({ ownerId: sessionData?.user?.id });
    toast({
      ...defaultToastOptions,
      title: t("garage.vehicle.createForm.toast.title"),
      description: t("garage.vehicle.createForm.toast.success"),
      status: "success",
    });
    onClose();
  }, [utils.garage.getVehiclesByOwner, sessionData?.user?.id, toast, t, onClose]);

  const onErrorHandler = React.useCallback(() => {
    toast({
      ...defaultToastOptions,
      title: t("garage.vehicle.createForm.toast.title"),
      description: t("garage.vehicle.createForm.toast.error"),
      status: "error",
    });
  }, [t, toast]);

  const handleSubmit = React.useCallback(async (
    values: VehicleFormValues,
  ) => {
    if (sessionData?.user?.id) {
      const parsedVehicle = await vehicleSchema.validate(values);
      insertVehicle.mutate({
        ...parsedVehicle,
        name: parsedVehicle.name,
        ownerId: sessionData.user.id,
      }, {
        onSuccess: onSuccessHandler,
        onError: onErrorHandler,
      });
    }
  }, [insertVehicle, onErrorHandler, onSuccessHandler, sessionData?.user?.id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={vehicleSchema}
        validateOnMount
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form id="create-vehicle">
            <ModalContent>
              <ModalHeader>{t("garage.vehicle.createForm.title")}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column" gap="16px">
                  <Field
                    as={Input}
                    name="name"
                    placeholder={t("garage.vehicle.createForm.field.name")}
                  />
                  <Field
                    as={Input}
                    name="description"
                    placeholder={t("garage.vehicle.createForm.field.description")}
                  />
                  <Field
                    as={Select}
                    name="typeId"
                    placeholder={t("garage.vehicle.createForm.field.type")}
                  >
                    {vehicleTypes?.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>))}
                  </Field>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose} colorScheme="primary" variant="ghost">
                  {t("garage.vehicle.createForm.button.cancel")}
                </Button>
                <Button
                  colorScheme="primary"
                  type="submit"
                  form="create-vehicle"
                  isLoading={isSubmitting}
                  isDisabled={!isValid || !dirty || isVehicleTypesLoading}
                >
                  {t("garage.vehicle.createForm.button.ctaAdd")}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
