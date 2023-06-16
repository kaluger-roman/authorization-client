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
import { useNavigate } from "react-router-dom";
import { Paths } from "../../shared/types";
import { Notification } from "../../components";
import { FormContainer, FormFields } from "shared/styles";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

export const Auth = () => {
  const loginText = useUnit(authModel.$loginText);
  const passwordText = useUnit(authModel.$passwordText);
  const isEmptyFields = useUnit(authModel.$isEmptyFields);
  const authPending = useUnit(authModel.$authPending);
  const errorAuth = useUnit(authModel.$errorAuth);

  const actions = {
    authClicked: useUnit(authModel.authClicked),
    loginTextChanged: useUnit(authModel.loginTextChanged),
    passwordTextChanged: useUnit(authModel.passwordTextChanged),
    resetErrors: useUnit(authModel.resetErrors),
  };

  const navigate = useNavigate();

  useGate(authModel.PageGate);

  return (
    <Paper sx={FormContainer}>
      <Notification
        type="error"
        message={errorAuth}
        onClose={actions.resetErrors}
      />
      <Typography variant="h4">Authorization</Typography>
      <Stack sx={FormFields}>
        <TextField
          label="Login"
          value={loginText}
          onChange={({ target }) => actions.loginTextChanged(target.value)}
        />
        <TextField
          type="password"
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
          onClick={() => navigate(Paths.register)}
          label="Registration"
        />
      </Stack>
    </Paper>
  );
};
