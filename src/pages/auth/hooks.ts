import { useUnit } from "effector-react";
import { applicationsModel } from "models/applications";
import { useEffect } from "react";
import { navigation } from "shared/navigate";
import { Paths } from "shared/types";

export const useAppSelect = () => {
  const app = useUnit(applicationsModel.$application);
  useEffect(() => {
    if (app) return;

    navigation.navigate(Paths.applications);
  }, [app]);
};
