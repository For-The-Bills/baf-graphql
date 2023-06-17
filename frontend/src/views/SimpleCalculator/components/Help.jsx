import styles from "./Help.module.scss"
import React from "react"
import { Slide, Fade } from "react-awesome-reveal"

import { IconButton } from "@mui/material"

import HelpIcon from "@mui/icons-material/Help"

const dictionary = {
  kalkulator: {
    title: "Kalkulator",
    description: "Opis kalkulatora...",
  },
  konfiguracja: {
    title: "Konfiguracja",
    description: (
      <p>
        W sekcji konfiguracja wybiera się "Rodzaj zabudowy" oraz "Obręb miasta"
        w celu sprawdzenia jaki jest wymagana wskaźnik BAF dla wybranego rodzaju
        inwestycji w wybranym obrębie miasta.<br></br>
        <br></br>
        Wymagana wartość jest różna w zależności od funkcji danego terenu - inna
        wartość określona jest dla np. zabudowy mieszkaniowej, inny dla zabudowy
        usługowej itd.
      </p>
    ),
  },
  nazwa: {
    title: "Nazwa",
    description: (
      <p>
        Nazwa pozwala lepiej zidentyfikować wiersze w tabeli. Jest to opcjonalne
        pole. Przykłady nazwy to np. "Drzewa sprzed domu", "Krzewy przy płocie"
        <br></br>
      </p>
    ),
  },
  "forma zagospodarowania": {
    title: "Forma zagospodarowania",
    description: "Opis formy zagospodarowania...",
  },
  współczynnik: {
    title: "Współczynnik",
    description: "Opis współczynnika...",
  },
  współczynnik: {
    title: "Współczynnik",
    description: "Opis współczynnika...",
  },
  współczynnik: {
    title: "Wartość BAF",
    description: "Opis współczynnika...",
  },
}

const Help = ({ selectedHelp, handleHelpChange }) => {
  const isEmpty = selectedHelp === ""
  const selectedTerm = dictionary[selectedHelp]

  return (
    <div className={styles.help}>
      <div className={styles.sectionTitle}>
        <p className={styles.sectionTitleText}>Pomoc</p>
      </div>
      {isEmpty ? (
        <div className={styles.helpHint}>
          <div className={styles.icon}>?</div>
          <div className={styles.message}>
            Kliknij ikonę znaku zapytania aby otrzymać informację o danym
            temacie
          </div>
        </div>
      ) : (
        <div className={styles.helpSelectedTerm}>
          <div className={styles.title}>{selectedTerm.title}</div>
          <div className={styles.divider}></div>
          <div className={styles.description}>{selectedTerm.description}</div>
        </div>
      )}
    </div>
  )
}

export default Help
