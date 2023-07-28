import { Header, Menu, Group, Center, Burger, Container, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useStyles } from '../styles/headerStyles';
import { getForms, resetForms } from '../../services/dbRequests';

const mostraDB = ()=>{
  getForms()
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
}

const resettaDB = ()=>{
  resetForms()
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

export function HeaderMenu({ links , handleTypeForm }) {
  const { classes } = useStyles()

  const items = links ? links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item onClick={()=>{handleTypeForm(item.label)}} key={item.link}>{item.label}</Menu.Item>
    ));


    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  }) : [] ;

  return (
    <>
    <Header height={56} mb={20}>
      <Container>
        <div className={classes.inner} style={{display:"flex",justifyContent:"center"}}>
          <Group className={classes.links}>
            {items}
          {/*   <Button onClick={mostraDB}>Mostra db</Button>   */}
          {/*   <Button onClick={resettaDB}>Resetta db</Button>   */}
          </Group>
        </div>
      </Container>
    </Header>
    </>
  );
}