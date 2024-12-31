/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  FormHelperText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { addToCartAsync, selectCartItems } from "../../cart/CartSlice";
import { motion } from "framer-motion";

export const ProductCard = ({
  id,
  title,
  price,
  thumbnail,
  brand,
  stockQuantity,
  handleAddRemoveFromWishlist,
  isWishlistCard,
  isAdminCard,
}) => {
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  console.log(loggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const theme = useTheme();

  // Media Queries
  const is408 = useMediaQuery(theme.breakpoints.down(408));
  const is488 = useMediaQuery(theme.breakpoints.down(488));
  const is752 = useMediaQuery(theme.breakpoints.down(752));

  const isProductAlreadyInWishlist = wishlistItems.some(
    (item) => item.product._id === id
  );
  const isProductAlreadyInCart = cartItems.some(
    (item) => item.product._id === id
  );

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const data = { user: loggedInUser?._id, product: id };
    dispatch(addToCartAsync(data));
  };

  return (
    <>
      {isProductAlreadyInWishlist !== -1 ? (
        <Stack
          component={isAdminCard || isWishlistCard || is408 ? "" : Paper}
          elevation={1}
          p={2}
          spacing={2} // Added consistent spacing
          width={is408 ? "auto" : is488 ? "200px" : is752 ? "300px" : "340px"}
          onClick={() => navigate(`/product-details/${id}`)}
          sx={{
            cursor: "pointer",
            borderRadius: "1rem",
          }}
        >
          {/* Image Section */}
          <Stack sx={{ position: "relative", overflow: "hidden" }}>
            <img
              width={"100%"}
              style={{
                aspectRatio: 1 / 1,
                objectFit: "contain",
                height: "fit-content",
                borderRadius: "1rem",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
              src={thumbnail}
              alt={`${title} photo unavailable`}
            />
          </Stack>

          {/* Details Section */}
          <Stack spacing={1}>
            {/* Title and Wishlist */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                fontWeight={400}
                noWrap // Prevents overflow
                sx={{ color: "#384959" }}
              >
                {title}
              </Typography>
              {!isAdminCard && (
                <motion.div
                  whileHover={{ scale: 1.1, y: -5, zIndex: 100 }}
                  whileTap={{ scale: 1 }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  <Checkbox
                    onClick={(e) => e.stopPropagation()}
                    checked={isProductAlreadyInWishlist}
                    onChange={(e) => handleAddRemoveFromWishlist(e, id)}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                  />
                </motion.div>
              )}
            </Stack>
            <Typography color="text.secondary" noWrap>
              {brand}
            </Typography>

            {/* Price and Add to Cart */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: theme.palette.primary.dark }}
              >
                ${price}
              </Typography>
              {!isWishlistCard &&
                loggedInUser?.isAdmin === false &&
                (isProductAlreadyInCart ? (
                  <motion.div
                  style={{
                    padding: "10px 15px",
                    border: "2px solid #6a89a7", 
                    borderRadius: "1rem",
                    cursor: "not-allowed",
                    fontSize: is408 ? ".9rem" : ".8rem",
                    textAlign: "center",
                  }}
                  >
                    In Cart
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 1 }}
                    onClick={(e) => handleAddToCart(e)}
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#6a89a7",
                      borderRadius: "1rem",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "white",
                      fontSize: is408 ? ".9rem" : ".8rem",
                    }}
                  >
                    <span>Add To Cart</span>
                  </motion.button>
                ))}
            </Stack>

            {stockQuantity <= 20 && (
              <FormHelperText sx={{ fontSize: ".9rem" }} error>
                {stockQuantity === 1
                  ? "Only 1 stock is left"
                  : "Only few are left"}
              </FormHelperText>
            )}
          </Stack>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
};
