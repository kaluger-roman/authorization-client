import { theme } from "@master_kufa/client-tools";
import { Box, Divider, Button } from "@mui/material";
import { useUnit } from "effector-react";
import { applicationsModel } from "models/applications";
import { APPLICATION_NAMES } from "shared/constants";
import { navigation } from "shared/navigate";
import { Paths } from "shared/types";

export const AppBackButton = () => {
  const application = useUnit(applicationsModel.$application);

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <span>
        Приложение:{" "}
        <Box
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            display: "inline",
          }}
        >
          {application && APPLICATION_NAMES[application]}
        </Box>
      </span>
      <Divider sx={{ ml: "auto" }} orientation="vertical" />
      <Button
        size="small"
        onClick={() => navigation.navigate(Paths.applications)}
        sx={{ borderRadius: 4 }}
      >
        Сменить приложение
      </Button>
    </Box>
  );
};
