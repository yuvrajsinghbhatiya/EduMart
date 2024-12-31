import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import {
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";

import {
  resetCartItemRemoveStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
} from "../CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SHIPPING, TAXES } from "../../../constants";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

export const Cart = ({ checkout }) => {
  const items = useSelector(selectCartItems);
  const subtotal = items.reduce(
    (acc, item) => item.product.price * item.quantity + acc,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));


  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items]);

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") {
      toast.success("Product removed from cart");
    } else if (cartItemRemoveStatus === "rejected") {
      toast.error("Error removing product from cart, please try again later");
    }
  }, [cartItemRemoveStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetCartItemRemoveStatus());
    };
  }, []);

  return (
    <Stack justifyContent={"flex-start"} alignItems={"center"} mb={"5rem"}>
      <Stack
        width={is900 ? "auto" : "50rem"}
        mt={"3rem"}
        paddingLeft={checkout ? 0 : 2}
        paddingRight={checkout ? 0 : 2}
        rowGap={4}
      >
        {/* Header */}
        <Stack
          alignSelf={"flex-start"}
          flexDirection={"row"}
          columnGap={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <motion.div whileHover={{ x: -5 }}>
              <IconButton component={Link} to={"/"}>
                <ArrowBackIcon fontSize={is480 ? "medium" : "large"} />
              </IconButton>
            </motion.div>
            <Typography variant="h4" fontWeight={500}sx={{
                backgroundColor: "#f5f5f5",
                padding: ".5rem",
                borderRadius: "1rem",
              }}>
              Your Cart
            </Typography>
        </Stack>

        <Divider />

        {/* Cart Items */}
        <Stack
          rowGap={2}
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          {items &&
            items.map((item) => (
              <CartItem
                key={item._id}
                id={item._id}
                title={item.product.title}
                brand={item.product.brand.name}
                category={item.product.category.name}
                price={item.product.price}
                quantity={item.quantity}
                thumbnail={item.product.thumbnail}
                stockQuantity={item.product.stockQuantity}
                productId={item.product._id}
              />
            ))}
        </Stack>

        {/* Subtotal */}
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          {checkout ? (
            <Stack rowGap={2} width={"100%"}>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Subtotal</Typography>
                <Typography>${subtotal}</Typography>
              </Stack>

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Shipping</Typography>
                <Typography>${SHIPPING}</Typography>
              </Stack>

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Taxes</Typography>
                <Typography>${TAXES}</Typography>
              </Stack>

              <hr />

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Total</Typography>
                <Typography>${subtotal + SHIPPING + TAXES}</Typography>
              </Stack>
            </Stack>
          ) : (
            <>
              <Stack>
                <Typography variant="h6" fontWeight={500}>
                  Subtotal
                </Typography>
                <Typography>Total items in cart: {totalItems}</Typography>
                <Typography variant="body1" color={"text.secondary"}>
                  Shipping and taxes will be calculated at checkout.
                </Typography>
              </Stack>

              <Stack>
                <Typography variant="h6" fontWeight={500}>
                  ${subtotal}
                </Typography>
              </Stack>
            </>
          )}
        </Stack>

        {/* Checkout or Continue Shopping */}
        {!checkout && (
          <Stack rowGap={"1rem"}>
            <Button
              variant="contained"
              component={Link}
              to="/checkout"
              sx={{
                width: "auto",
                fontSize: "1rem",
                marginTop: "1rem",
                padding: ".5rem 1rem",
                backgroundColor: "#6a89a7",
              }}
            >
              Checkout
            </Button>
            <motion.div style={{ alignSelf: "center" }} whileHover={{ y: 2 }}>
              <Chip
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  width: "auto",
                  padding: "1rem",
                  color: "primary.main",
                  borderColor: "primary.main",
                  fontSize: "1rem",
                  marginTop: "1rem",
                }}
                component={Link}
                to={"/"}
                label="or continue shopping"
                variant="outlined"
              />
            </motion.div>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
