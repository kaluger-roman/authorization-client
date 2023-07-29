import { adjustAppHeight } from "@master_kufa/client-tools";
import { SxProps } from "@mui/material";

export const Container: SxProps = {
  width: "100vw",
  height: adjustAppHeight(),
  bgcolor: "grey.300",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
};
