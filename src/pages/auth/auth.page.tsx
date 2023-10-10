import { useGate, useUnit } from "effector-react";
import { authModel } from "../../models";
import {
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Paths } from "../../shared/types";
import { FormContainer, FormFields } from "shared/styles";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { navigation } from "../../shared/navigate";
import { PasswordStyles } from "./auth.styles";

export const Auth = () => {
  const loginText = useUnit(authModel.$loginText);
  const passwordText = useUnit(authModel.$passwordText);
  const isEmptyFields = useUnit(authModel.$isEmptyFields);
  const authPending = useUnit(authModel.$authPending);

  const actions = {
    authClicked: useUnit(authModel.authClicked),
    loginTextChanged: useUnit(authModel.loginTextChanged),
    passwordTextChanged: useUnit(authModel.passwordTextChanged),
  };

  useGate(authModel.PageGate);

  return (
    <Paper sx={FormContainer}>
      <Typography variant="h4">Authorization</Typography>
      <Stack sx={FormFields}>
        <TextField
          type="text"
          label="Login"
          value={loginText}
          onChange={({ target }) => actions.loginTextChanged(target.value)}
        />
        <TextField
          type="text"
          InputProps={{ sx: PasswordStyles }}
          label="Password"
          value={passwordText}
          onChange={({ target }) => actions.passwordTextChanged(target.value)}
        />
        <Button
          endIcon={authPending && <HourglassTopIcon />}
          disabled={isEmptyFields}
          variant="contained"
          onClick={actions.authClicked}
        >
          Sign in
        </Button>
        <Chip
          clickable
          onClick={() => navigation.navigate(Paths.register)}
          label="Registration"
        />
      </Stack>
    </Paper>
  );
};
