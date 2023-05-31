import { useState } from "react";
import "./App.css";
import {
  AppBar,
  CssBaseline,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { DarkMode as DarkModeIcon } from "@mui/icons-material";
import Contacts from "./components/Contacts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem("darkMode");
    if (mode && mode === "true") return true;
    return false;
  });

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar sx={{ px: "1rem" }}>
              <Stack direction="row" alignItems="center">
                <Typography variant="h4">Contacts</Typography>
                <FormGroup sx={{ ml: "auto" }}>
                  <FormControlLabel
                    control={<Switch checked={darkMode} />}
                    onClick={() => {
                      setDarkMode((mode) => !mode);
                      localStorage.setItem(
                        "darkMode",
                        darkMode ? "false" : "true"
                      );
                    }}
                    label={
                      <IconButton>
                        <DarkModeIcon />
                      </IconButton>
                    }
                  />
                </FormGroup>
              </Stack>
            </AppBar>
            <Contacts />
          </ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
