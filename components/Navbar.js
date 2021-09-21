import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Container } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const Navbar = () => {
  const router = useRouter()

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '5px' }}>
      <AppBar position="static">
        <Container maxWidth={"lg"}>
          <Toolbar>
            <Link href="/">
              <a>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Elextronix
                </Typography>
              </a>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => router.push("/cart")}
              >
                {/* <Badge badgeContent={17} color="error"> */}
                  <ShoppingCart />
                {/* </Badge> */}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
