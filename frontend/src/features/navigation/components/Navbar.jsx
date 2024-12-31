import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Badge, Stack, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectCartItems } from '../../cart/CartSlice';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';

export const Navbar = ({ isProductList = false }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo = useSelector(selectUserInfo);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const cartItems = useSelector(selectCartItems); // Select cart items
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { name: "Home", to: "/" },
    ...(!loggedInUser?.isAdmin ? [{ name: 'Profile', to: '/profile' }] : []),
    { name: loggedInUser?.isAdmin ? 'Orders' : 'My orders', to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders" },
    { name: 'Logout', to: "/logout" },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", boxShadow: "none", color: "text.primary" }}>
      <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-between" , margin:" 0 2rem"}}>
        {/* Left side - Title */}
        <Typography
          variant="h5"
          component="a"
          sx={{
            fontWeight: 700,
            color: '#384959',
            textDecoration: 'none',
            cursor: 'pointer',

          }}
        >
          EDUMART
        </Typography>

        {/* Right side - User menu and icons */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* User Menu */}
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
              <Avatar alt={userInfo?.name} src="null" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* User name at the top of dropdown */}
            <MenuItem sx={{ pointerEvents: 'none' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#384959" }}>
                {userInfo?.name}
              </Typography>
            </MenuItem>
            <Divider />
            
            {loggedInUser?.isAdmin && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component={Link} color="text.primary" sx={{ textDecoration: "none", color:"#384959"}} to="/admin/add-product">
                  Add new Product
                </Typography>
              </MenuItem>
            )}
            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                <Typography component={Link}  sx={{ textDecoration: "none", color:"#384959" }} to={setting.to}>
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Cart Icon */}
          {!loggedInUser?.isAdmin && cartItems?.length > 0 && (
            <Badge badgeContent={cartItems.length} color="error">
              <IconButton onClick={() => navigate("/cart")}>
                <ShoppingCartOutlinedIcon sx={{ color: "#384959" }}/>
              </IconButton>
            </Badge>
          )}

          {/* Filter Icon (only for non-admin users) */}
          {!loggedInUser?.isAdmin && isProductList && (
            <IconButton onClick={handleToggleFilters}>
              <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "#384959" }}  />
            </IconButton>
          )}

          {/* Wishlist Icon (only for non-admin users) */}
          {!loggedInUser?.isAdmin && (
            <Badge badgeContent={wishlistItems?.length} color="error">
              <IconButton component={Link} to="/wishlist">
                <FavoriteBorderIcon sx={{ color: "#384959" }}
                 />
              </IconButton>
            </Badge>
          )}

          {/* Admin Badge */}
          {loggedInUser?.isAdmin && (
            <Button 
              variant="outlined" 
              color="primary"
              size="small"
              sx={{ 
                borderRadius: '16px',
                textTransform: 'none',
                px: 2,
                color: "#384959",
                backgroundColor: "#bdddfc",
              }}
            >
              Admin
            </Button>
          )}
        </Stack>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Navbar;
