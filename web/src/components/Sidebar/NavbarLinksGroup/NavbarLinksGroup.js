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
    color: '#000',
    fontWeight: 400,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
    marginTop: 4,
    fontSize: theme.fontSizes.lg,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    position: 'relative',
    '&:hover': {
      backgroundColor: 'var(--mantine-color-dark-8)',
      color: '#45f3ff',
      '&:before': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: -50,
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: '50%',
        boxShadow: '35px 35px 0 10px var(--mantine-color-dark-8)',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        right: 0,
        bottom: -50,
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: '50%',
        boxShadow: '35px -35px 0 10px var(--mantine-color-dark-8)',
      },
    },
  },

  link: {
    fontWeight: 400,
    display: 'block',
    padding: '14px 0px',
    paddingLeft: 31,
    marginLeft: 30,
    height: 48,
    marginTop: 2,
    fontSize: theme.fontSizes.md,
    color: theme.colors.gray[9],
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    position: 'relative',
    '&:hover': {
      backgroundColor: 'var(--mantine-color-dark-8)',
      color: '#45f3ff',
      '&:before': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: -48,
        width: 48,
        height: 48,
        backgroundColor: 'transparent',
        borderRadius: '50%',
        boxShadow: '34px 34px 0 10px var(--mantine-color-dark-8)',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        right: 0,
        bottom: -48,
        width: 48,
        height: 48,
        backgroundColor: 'transparent',
        borderRadius: '50%',
        boxShadow: '34px -34px 0 10px var(--mantine-color-dark-8)',
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
          // style={{
          //   color: 'inherit'
          // }}
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
