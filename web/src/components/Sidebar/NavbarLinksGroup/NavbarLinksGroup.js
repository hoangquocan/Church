import { NavLink} from '@redwoodjs/router'
import { useState } from 'react'
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
} from '@mantine/core'

import './NavbarLinksGroup.scss'

const useStyles = createStyles((theme) => ({
  control: {
    color: '#fff',
    background: "transparent",
    fontWeight: 400,
    display: 'block',
    width: '100%',
    zIndex: 8,
    border: '1px solid transparent',
    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
    marginTop: 4,
    fontSize: theme.fontSizes.lg,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    position: 'relative',
    '&:hover': {
      backgroundColor: 'var(--layout-bg-color)',
      color: '#45f3ff',
      borderColor: '#45f3ff',
      borderRight: 'none',
      zIndex:10,
      '&:before': {
        content: '""',
        position: 'absolute',
        right: -3,
        top: -62,
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        // borderRight: '1px solid #45f3ff',
        borderBottom: '1.5px solid #45f3ff',
        // borderRadius: '0 0 25px 0',
        boxShadow: '35px 35px 0 10px var(--layout-bg-color)',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        right: -3,
        bottom: -61,
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        borderTop: '1.5px solid #45f3ff',
        // borderRight: '1px solid #45f3ff',
        // borderRadius: '0px 25px 0 0',
        boxShadow: '35px -35px 0 10px var(--layout-bg-color)',
      },
    },
  },

  link: {
    fontWeight: 400,
    zIndex: 9,
    display: 'block',
    padding: '16px 0px',
    paddingLeft: 31,
    marginLeft: 30,
    height: 60,
    marginTop: 2,
    fontSize: theme.fontSizes.md,
    color: "#fff",
    border: '1px solid transparent',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    position: 'relative',
    '&:hover': {
      zIndex: 10,
      backgroundColor: 'var(--layout-bg-color)',
      color: '#45f3ff',
      borderColor: '#45f3ff',
      '&:before': {
        content: '""',
        position: 'absolute',
        right: -3,
        top: -61,
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        // borderRight: '1px solid #45f3ff',
        borderBottom: '1px solid #45f3ff',
        // borderRadius: '0 0 25px 0',
        boxShadow: '35px 35px 0 10px var(--layout-bg-color)',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        right: -2,
        bottom: -61,
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        borderTop: '1px solid #45f3ff',
        // borderRight: '1px solid #45f3ff',
        // borderRadius: '0px 25px 0 0',
        boxShadow: '35px -35px 0 10px var(--layout-bg-color)',
      },
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
    zIndex: 10,
    fontSize: 10,
  },
}))
const NavbarLinksGroup = ({ label, icon, links, to }) => {
  const [opened, setOpened] = useState(false)
  const hasLinks = Array.isArray(links)
  const { classes, theme } = useStyles()

  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      className={classes.link}
      key={link.label}
      to={link.to}
      activeClassName="actived"
    >
      {link.label}
    </NavLink>
  ))

  return (
    <>
      {!hasLinks && (
        <NavLink
          to={'/'}
          activeClassName="actived"
          className={classes.control}
        >
          <Group position="apart">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={38} radius="50%" color="cyan">
                <ion-icon name={icon}></ion-icon>
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
          </Group>
        </NavLink>
      )}
      {hasLinks && (
        <UnstyledButton
          className={classes.control}
          onClick={() => setOpened((o) => !o)}
        >
          <Group position="apart">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={38} radius="50%" color="cyan">
                <ion-icon name={icon}></ion-icon>
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            <ion-icon
              className={classes.chevron}
              style={{
                transition: 'transform 200ms ease',
                zIndex: 10,
                fontSize: 18,
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
              name="chevron-forward-outline"
            ></ion-icon>
          </Group>
        </UnstyledButton>
      )}
      <Collapse in={opened}>{items}</Collapse>
    </>
  )
}

export default NavbarLinksGroup
