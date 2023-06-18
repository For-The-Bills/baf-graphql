import styles from "./Navbar.module.scss";
import { matchPath, withRouter } from "react-router";
import bafLogo from "../../assets/images/logo.png";
import {
  motion,
  useAnimationControls,
  useCycle,
  useScroll,
} from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { Typography } from "@mui/material";
import { connect } from "react-redux";
import { Slide } from "react-awesome-reveal";

function Navbar(props) {
  const links = [
    { name: "HOME", to: "/" },
    { name: "Kalkulator Prosty", to: "/simplecalculator" },
    { name: "Mapa", to: "/calculator" },
  ];
  console.log(props)
  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.left}>
      <Slide direction="left" triggerOnce={true}>
        <img
          className={styles.logo}
          src={bafLogo}
          alt="Dąbrowa Górnicza kalkulator BAF"
        />
      </Slide>

      </div>
      
<div className={styles.right}>
<div className={styles.links}>
        {links.map((page, index) => {
          const match = matchPath(props.location.pathname, {
            path: page.subpages ? [page.to, page.to + "/:id"] : page.to, //żeby zmatchować też np news/id newsa
            exact: true,
          });

          const cs = [styles.linkButton];
          if (match) cs.push(styles.activeLinkButton);

          return (
            <motion.div
              variants={linkVariants}
              key={index}
              className={classNames(cs)}
            
            >
              <Link to={page.to} className={classNames(cs)}>
                <div className={styles.linkName} textAlign="center">
                  {page.name.toUpperCase()}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
</div>

      
    </div>
  );
}

export default withRouter(Navbar);
