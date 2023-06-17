import styles from "./Hints.module.scss"
import React, { useState } from "react"
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"

const Hints = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const categories = [
    {
      id: 0,
      name: "Rośliny",
      hints: [
        "Posadź więcej drzew i krzewów wokół budynków.",
        "Zainstaluj dachy zielone na budynkach.",
        "Stwórz ogród deszczowy na swojej działce.",
      ],
    },
    {
      id: 1,
      name: "Płyny",
      hints: [
        "Zainstaluj systemy retencji wody deszczowej.",
        "Wykorzystuj beczki na deszczówkę do podlewania roślin.",
        "Ogranicz użycie chemikaliów w gospodarstwie domowym.",
      ],
    },
    {
      id: 2,
      name: "Infrastruktura",
      hints: [
        "Stwórz ścieżki rowerowe i chodniki o przepuszczalnej nawierzchni.",
        "Zainstaluj zielone dachy na garażach i parkingach.",
        "Wprowadź ściany zielone na budynkach.",
      ],
    },
  ]

  return (
    <div className={styles.hintsContainer}>
      <div className={styles.hintIntro}>
        <TipsAndUpdatesIcon></TipsAndUpdatesIcon>
        <p>Jeśli chcesz zwiększyć wartość BAF, przeczytaj poniższe rady</p>
      </div>

      <AppBar position="static" sx={{ bgcolor: "white" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              label={category.name}
              className={activeTab === category.id ? styles.activeTab : ""}
            />
          ))}
        </Tabs>
      </AppBar>

      {categories.map((category) => (
        <TabPanel key={category.id} value={activeTab} index={category.id}>
          <List>
            {category.hints.map((hint, index) => (
              <ListItem key={index}>
                <ListItemText primary={hint} />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      ))}
    </div>
  )
}

const TabPanel = (props) => {
  const { children, value, index } = props

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

export default Hints
