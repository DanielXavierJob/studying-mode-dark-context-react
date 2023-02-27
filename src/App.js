import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();

  //contexto necessário pra mudar a cor
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

      {/* Mostrando todos os backgrounds atuais */}
      {theme.palette.backgrounds.map((item, i) => {
        return (
          <p key={i}>
            {item.name} - {item.background}
          </p>
        );
      })}


      {/* Mostrando um background */}
      Pegando o Navbar:
      {theme.palette.backgrounds.find((background) => background.name == "navbar").background}
    </Box>
  );
}

export default function ToggleColorMode() {

  // Aqui eu seto as variaveis com os modos
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

  //crio um useState com o modo selecionado
  const [mode, setMode] = React.useState(lightMode);


  //utilizo o useMemo para criar o contexto de mudar os modos
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

  // crio o tema
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
    // exporto o contexto do useState
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
