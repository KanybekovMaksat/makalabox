import { AppBar, Box, Toolbar, IconButton, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import SearchIcon from '@mui/icons-material/Search';
import WidgetsIcon from '@mui/icons-material/Widgets';

export function GuestBar() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      className="bg-pc-100 shadow-none border-b-1 border-sc-100"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters className="flex justify-between">
          <Box className="flex items-center">
            <WidgetsIcon className="mr-1 text-pc-500" />
            <Link
              to={pathKeys.home()}
              className="font-bold text-xl text-pc-500"
            >
              Makala Box
            </Link>
          </Box>
          <Box className="flex items-center gap-1">
            <Link to={pathKeys.feed()}>
              <IconButton
                className="hidden md:flex"
                aria-label="navigate to article page"
              >
                <SearchIcon />
              </IconButton>
            </Link>
            <Link
              to={pathKeys.login()}
              className="font-serif p-2 rounded border border-pc-400 text-pc-500 "
            >
              Авторизоваться
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
