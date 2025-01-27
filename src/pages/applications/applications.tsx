import { Box, Typography } from "@mui/material";
import { APPLICATION_CARDS } from "./constants";
import { theme } from "@master_kufa/client-tools";
import { applicationsModel } from "models/applications";
import { navigation } from "shared/navigate";
import { Paths } from "shared/types";
import { ReactComponent as LogoFull } from "@master_kufa/client-tools/icons/logo-full.svg";

export const Applications = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        background: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        m: 2,
      }}
    >
      <Typography
        fontWeight="bold"
        sx={{ color: theme.palette.text.primary }}
        variant="h3"
      >
        Приложения
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {APPLICATION_CARDS.map(({ app, name, icon }) => (
          <Box
            key={app}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              background: theme.palette.primary.light,
              borderRadius: 2,
              p: 2,
              "&:hover": { cursor: "pointer", transform: "scale(1.05)" },
            }}
            onClick={() => {
              applicationsModel.selectApplication(app);
              navigation.navigate(`${Paths.auth}#${app}`);
            }}
          >
            <Box
              sx={{
                background: `url(${icon})`,
                width: 150,
                height: 150,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Typography sx={{ color: theme.palette.text.primary }} variant="h5">
              {name}
            </Typography>
          </Box>
        ))}
      </Box>

      <LogoFull style={{ width: 180 }} />
    </Box>
  );
};
