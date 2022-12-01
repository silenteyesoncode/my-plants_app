import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "interfaces/RootStackParamList";
import Back from "components/Back";
import BasicButton from "components/BasicButton";
import { SettingsSection } from "components/Settings/styles";
import SettingsHeader from "components/Settings/header";
import SettingsItem from "components/Settings/item";
import { ColumnCenterWrapper, ScreenContainer } from "styles/shared";
import i18n from "config/i18n";

type SettingsProps = NativeStackScreenProps<RootStackParamList, "settings">;

const { t } = i18n;

const Settings = ({ navigation }: SettingsProps): JSX.Element => {
  return (
    <ScreenContainer>
      <Back navigation={navigation} />
      <ColumnCenterWrapper>
        <SettingsSection>
          <SettingsHeader text={t("pages.settings.header")} />
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsNotifications");
              }}
              text={t("pages.settings.notificationsHeader")}
            />
          </SettingsItem>
          <SettingsItem>
            <BasicButton
              onPress={() => {
                navigation.navigate("settingsApp");
              }}
              text={t("pages.settings.appHeader")}
            />
          </SettingsItem>
        </SettingsSection>
      </ColumnCenterWrapper>
    </ScreenContainer>
  );
};

export default Settings;
