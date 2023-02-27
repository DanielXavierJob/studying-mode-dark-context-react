import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      {theme.palette.backgrounds.map((item, i) => {
        return (
          <p key={i}>
            {item.name} - {item.background}
          </p>
        );
      })}
    </Box>
  );
}

export default function ToggleColorMode() {
  const lightMode = {
    mode: "light",
    backgrounds: [
      {
        name: "navbar",
        background: "#fff9",
      },
      {
        name: "sidebar",
        background: "#fff8",
      },
    ],
  };
  const darkMode = {
    mode: "dark",
    backgrounds: [
      {
        name: "navbar",
        background: "#003",
      },
      {
        name: "sidebar",
        background: "#002",
      },
    ],
  };
  const [mode, setMode] = React.useState(lightMode);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode.mode === "light" ? darkMode : lightMode
        );
      },
      mode,
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          ...mode
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
