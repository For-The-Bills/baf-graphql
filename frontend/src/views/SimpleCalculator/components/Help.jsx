import styles from "./Help.module.scss"
import React from "react"
import { Slide, Fade } from "react-awesome-reveal"

import { IconButton } from "@mui/material"

import HelpIcon from "@mui/icons-material/Help"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"

const surfaces = [
  {
    category: "Powierzchnie szczelne (nieprzepuszczalne)",
    items: [
      { name: "Asfalt", value: "0" },
      { name: "Beton", value: "0" },
      { name: "Kamień", value: "0" },
    ],
  },
  {
    category: "Powierzchnie półprzepuszczalne",
    items: [
      { name: "Żwir, grys", value: "0.5" },
      { name: "Płyta ażurowa betonowa", value: "0.5" },
      { name: "Kruszywa łączone żywicą", value: "0.5" },
      { name: "Inne materiały sypkie", value: "0.5" },
    ],
  },
  {
    category: "Powierzchnie perforowane",
    items: [
      { name: "Nawierzchnia mineralno-żywiczna", value: "0.3" },
      { name: "Kostka brukowa z przestrzeniami dylatacyjnymi", value: "0.3" },
    ],
  },
  {
    category: "Powierzchnie przepuszczalne",
    items: [{ name: "Geokrata (geosiatka komórkowa)", value: "1" }],
  },
  {
    category: "Pozostałe",
    items: [
      { name: "Zabudowa", value: "0" },
      { name: "Drzewo (pow. odkryta pod koroną, m2)", value: "1" },
      { name: "Krzew (pow. odkryta pod krzewem, m2)", value: "0.7" },
      { name: "Łąka kwietna", value: "0.7" },
      { name: "Trawa (murawa)", value: "0.3" },
      { name: "Dachy zielone", value: "0.7" },
      { name: "Ściany zielone", value: "0.5" },
      { name: "Rośliny pnące (na 1m2 powierzchni)", value: "0.3" },
      { name: "Ogród deszczowy (na 1m2)", value: "0.7" },
    ],
  },
]

const tips = [
  {
    name: "Drzewa",
    description: (
      <>
        przeznaczenie 50 m<sup>2</sup> powierzchni działki na drzewa poprawi
        bilans biologiczny działki
      </>
    ),
  },
  {
    name: "Krzewy",
    description: (
      <>
        przeznaczenie 100 m<sup>2</sup> powierzchni działki na krzewy znacznie
        poprawi bilans biologiczny działki
      </>
    ),
  },
  {
    name: "Łąka kwietna",
    description: (
      <>
        przeznaczenie 40 m<sup>2</sup> powierzchni działki na łąki kwietne
        poprawi bilans biologiczny działki
      </>
    ),
  },
  {
    name: "Dachy zielone",
    description: (
      <>
        wykorzystanie 100 m<sup>2</sup> powierzchni dachów zabudowy jako zielone
        dachy znacznie poprawi bilans biologiczny działki
      </>
    ),
  },
]

const dictionary = {
  kalkulator: {
    title: "Kalkulator",
    description: (
      <p>
        Opis kalkulatora...
        <br></br>
        <br></br>
        Przykład 1: Działka, którą rozpatrujemy ma powierzchnię 200m2.
        Inwestycja polega na wybudowaniu budynku jednorodzinnego, podjazdu,
        zasadzeniu trawnika i 1 drzewa, którego powierzchnia pod koroną będzie
        wynosić 2m2. BAF to iloczyn powierzchni i współczynnika wyznaczonego
        podczas pracy z ekspertami. Przy jego opracowaniu będzie brana pod uwagę
        przepuszczalność powierzchni, bioróżnorodność, ranga elementu
        przyrodniczego itd. Końcowa wartość BAF to iloraz całkowitej powierzchni
        BAF, powstającej po zsumowaniu wyliczonej powierzchni biotopu i
        całkowitej powierzchni działki.
      </p>
    ),
  },
  konfiguracja: {
    title: "Konfiguracja",
    description: (
      <p>
        W sekcji konfiguracja wybiera się "Rodzaj zabudowy" oraz "Obręb miasta"
        w celu sprawdzenia jaka jest wymagana wartość BAF dla wybranego rodzaju
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
    description: (
      <div>
        <p>
          Forma zagospodarowania to różne elementy, które znajdują się na twojej
          działce. Poniżej wypisane są kategorie form zagospodarowań wraz z
          przykładami oraz korespendującymi im współczynnikami:
        </p>
        {surfaces.map((surface, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{surface.category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {surface.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Typography>
                      {item.name}: {item.value}
                    </Typography>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    ),
  },
  współczynnik: {
    title: "Współczynnik",
    description: "Opis współczynnika...",
  },
  "wartość baf": {
    title: "Wartość BAF",
    description:
      "Opis wartości BAF... Wartość BAF to iloraz całkowitej powierzchni BAF i całkowitej powierzchni działki",
  },
  "porady dla projektanta": {
    title: "Porady dla projektanta",
    description: (
      <div>
        <div className={styles.tipTitle}>
          Aby uzyskać odpowiednią wartość BAF, proponujemy dodać:
        </div>
        <List>
          {tips.map((tip, index) => (
            <ListItem>
              <ListItemText primary={tip.name} secondary={tip.description} />
            </ListItem>
          ))}
        </List>
      </div>
    ),
  },
}

const Help = ({ selectedHelp, handleHelpChange }) => {
  const isEmpty = selectedHelp === ""
  const selectedTerm = dictionary[selectedHelp]

  return (
    <Slide
      direction="right"
      triggerOnce={true}
      className={styles.helpContainer}
    >
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
    </Slide>
  )
}

export default Help
