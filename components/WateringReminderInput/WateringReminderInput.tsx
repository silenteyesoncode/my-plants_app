import { AnimatePresence } from "moti";
import React from "react";
import {
  ErrorWrapper,
  ErrorText,
} from "components/BasicTextInput/BasicTextInput.styles";

import {
  Container,
  Wrapper,
  Input,
  Text,
  ErrorContainer,
} from "./WateringReminderInput.styles";
import { WateringReminderInputProps } from "./WateringReminderInput.interface";
import i18n from "../../i18n";

const WateringReminderInput = ({
  numberValue,
  setNumberValue,
  error,
}: WateringReminderInputProps): JSX.Element => {
  const { t } = i18n;

  return (
    <Container>
      <Wrapper>
        <Text>{t("components.wateringReminderInput.every")}</Text>
        <Input
          value={`${numberValue}`}
          onChangeText={setNumberValue}
          keyboardType="number-pad"
          errorBorder={!!error}
          maxLength={2}
        />
        <Text>
          {numberValue == 1
            ? t("components.wateringReminderInput.daySingular")
            : t("components.wateringReminderInput.dayPlurar")}
        </Text>
      </Wrapper>
      <AnimatePresence>
        <ErrorContainer>
          {error ? (
            <ErrorWrapper
              from={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
            >
              <ErrorText>{error}</ErrorText>
            </ErrorWrapper>
          ) : null}
        </ErrorContainer>
      </AnimatePresence>
    </Container>
  );
};

export default WateringReminderInput;
