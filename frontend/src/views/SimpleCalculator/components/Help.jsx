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
    description: "Opis konfiguracji...",
  },
  nazwa: {
    title: "Nazwa",
    description: "Opis nazwy...",
  },
  "forma zagospodarowania": {
    title: "Forma zagospodarowania",
    description: "Opis formy zagospodarowania...",
  },
  współczynnik: {
    title: "Współczynnik",
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
