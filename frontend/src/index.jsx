import { createBrowserHistory } from "history"
import React, { useRef, useState } from "react"

import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import "./index.scss"
import { persistor, store } from "./redux/store"
import reportWebVitals from "./reportWebVitals"
import ViewManager from "./ViewManager"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import variables from "./assets/variables.scss"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"


const theme = createTheme({
  palette: {
    primary: {
      main: variables.green,
    },
    // secondary: {
    //   main: variables.orangered,
    // }
  },
  components: {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          borderWidth: 2,
          borderRadius: 0,
          "&:hover": {
            borderWidth: 2,
          },
          "&:disabled": {
            borderWidth: 2,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "Jost",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
})

const container = document.getElementById("root")
const root = createRoot(container)

export const history = createBrowserHistory()

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
        <Router history={history}>
          <Navbar/>
          <div id="SXWrapper" className="content">
            <ViewManager />
            <Footer/>
          </div>
        </Router>
    </Provider>
  </ThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
