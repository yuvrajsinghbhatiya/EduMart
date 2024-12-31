import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectSelectedProduct,
} from "../ProductSlice";
import {
  Box,
  Checkbox,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  Button,
  Divider,
} from "@mui/material";
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems,
} from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  fetchReviewsByProductIdAsync,
  resetReviewFetchStatus,
  selectReviewFetchStatus,
  selectReviews,
} from "../../review/ReviewSlice";
import { Reviews } from "../../review/components/Reviews";
import { toast } from "react-toastify";
import { MotionConfig, motion } from "framer-motion";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import Favorite from "@mui/icons-material/Favorite";
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice";
import { useTheme } from "@mui/material";
import Lottie from "lottie-react";
import { loadingAnimation } from "../../../assets";

export const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector(selectSelectedProduct);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const [quantity, setQuantity] = useState(1);
  const reviews = useSelector(selectReviews);
  const theme = useTheme();
  const is1420 = useMediaQuery(theme.breakpoints.down(1420));
  const is990 = useMediaQuery(theme.breakpoints.down(990));
  const is840 = useMediaQuery(theme.breakpoints.down(840));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const is387 = useMediaQuery(theme.breakpoints.down(387));
  const is340 = useMediaQuery(theme.breakpoints.down(340));

  const wishlistItems = useSelector(selectWishlistItems);

  const isProductAlreadyInCart = cartItems.some(
    (item) => item.product._id === id
  );
  const isProductAlreadyinWishlist = wishlistItems.some(
    (item) => item.product._id === id
  );

  const productFetchStatus = useSelector(selectProductFetchStatus);
  const reviewFetchStatus = useSelector(selectReviewFetchStatus);

  const totalReviewRating = reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const totalReviews = reviews.length;
  const averageRating = parseInt(Math.ceil(totalReviewRating / totalReviews));

  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
      dispatch(fetchReviewsByProductIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (wishlistItemAddStatus === "fulfilled") {
      toast.success("Product added to wishlist");
    } else if (wishlistItemAddStatus === "rejected") {
      toast.error("Error adding product to wishlist, please try again later");
    }
  }, [wishlistItemAddStatus]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === "fulfilled") {
      toast.success("Product removed from wishlist");
    } else if (wishlistItemDeleteStatus === "rejected") {
      toast.error(
        "Error removing product from wishlist, please try again later"
      );
    }
  }, [wishlistItemDeleteStatus]);

  useEffect(() => {
    if (productFetchStatus === "rejected") {
      toast.error("Error fetching product details, please try again later");
    }
  }, [productFetchStatus]);

  useEffect(() => {
    if (reviewFetchStatus === "rejected") {
      toast.error("Error fetching product reviews, please try again later");
    }
  }, [reviewFetchStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductFetchStatus());
      dispatch(resetReviewFetchStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const handleAddToCart = () => {
    const item = { user: loggedInUser._id, product: id, quantity };
    dispatch(addToCartAsync(item));
    setQuantity(1);
  };

  const handleDecreaseQty = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    if (quantity < 20 && quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddRemoveFromWishlist = (e) => {
    if (e.target.checked) {
      const data = { user: loggedInUser?._id, product: id };
      dispatch(createWishlistItemAsync(data));
    } else if (!e.target.checked) {
      const index = wishlistItems.findIndex((item) => item.product._id === id);
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  };

  return (
    <>
      {!(
        productFetchStatus === "rejected" && reviewFetchStatus === "rejected"
      ) && (
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mb: "2rem",
            rowGap: "2rem",
          }}
        >
          {(productFetchStatus || reviewFetchStatus) === "pending" ? (
            <Stack
              width={is500 ? "35vh" : "25rem"}
              height={"calc(100vh - 4rem)"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Lottie animationData={loadingAnimation} />
            </Stack>
          ) : (
            <Stack>
              <Stack
                width={is480 ? "auto" : is1420 ? "auto" : "85rem"}
                p={is480 ? 2 : 0}
                height={is840 ? "auto" : "45rem"}
                rowGap={5}
                mt={is840 ? 0 : 5}
                justifyContent={"center"}
                mb={5}
                flexDirection={is840 ? "column" : "row"}
                columnGap={is990 ? "2rem" : "8rem"}
              >
                {/* Main product image */}
                <Stack
                >
                  <div
                    style={{
                      maxWidth: "500px",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      marginTop: "2rem",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                      src={product?.thumbnail}
                      alt={`${product?.title}`}
                    />
                  </div>
                </Stack>

                {/* Right stack - product details */}
                <Stack
                  rowGap={"1.5rem"}
                  width={is480 ? "100%" : "25rem"}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    padding: "1rem",
                    borderRadius: "8px",
                    height: "fit-content",
                    marginTop: "2rem",
                  }}
                >
                  <Stack rowGap={".5rem"}>
                    <Typography
                      variant="h4"
                      fontWeight={600}
                      sx={{ color: "#384959" }}
                    >
                      {product?.title}
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        columnGap: is340 ? ".5rem" : "1rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                        rowGap: "1rem",
                      }}
                    >
                      <Rating value={averageRating} readOnly />
                      <Typography>
                        (
                        {totalReviews === 0
                          ? "No reviews"
                          : totalReviews === 1
                          ? `${totalReviews} Review`
                          : `${totalReviews} Reviews`}
                        )
                      </Typography>
                      <Typography
                        color={
                          product?.stockQuantity <= 10
                            ? "error"
                            : product?.stockQuantity <= 20
                            ? "orange"
                            : "green"
                        }
                      >
                        {product?.stockQuantity <= 10
                          ? `Only ${product?.stockQuantity} left`
                          : product?.stockQuantity <= 20
                          ? "Only few left"
                          : "In Stock"}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="h5"
                      sx={{ color: theme.palette.primary.dark }}
                    >
                      ${product?.price}
                    </Typography>
                  </Stack>

                  <Stack rowGap={".8rem"}>
                    <Typography>{product?.description}</Typography>
                    <hr />
                  </Stack>

                  {!loggedInUser?.isAdmin && (
                    <Stack sx={{ rowGap: "1.3rem" }} width={"fit-content"}>
                      <Stack
                        flexDirection={"row"}
                        columnGap={is387 ? ".3rem" : "1.5rem"}
                        width={"100%"}
                      >
                        <Stack
                          flexDirection={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <MotionConfig
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1 }}
                          >
                            <motion.button
                              onClick={handleDecreaseQty}
                              style={{
                                padding: "10px 15px",
                                borderRadius: "1rem",
                                border: "1px solid #6a89a7",
                                cursor: "pointer",
                                fontSize: "1.2rem",

                                color: "primary",
                              }}
                            >
                              -
                            </motion.button>
                            <p
                              style={{
                                margin: "0 1rem",
                                fontSize: "1.1rem",
                                fontWeight: "400",
                              }}
                            >
                              {quantity}
                            </p>
                            <motion.button
                              onClick={handleIncreaseQty}
                              style={{
                                padding: "10px 15px",
                                borderRadius: "1rem",
                                border: "1px solid #6a89a7",
                                cursor: "pointer",
                                fontSize: "1.2rem",

                                color: "primary",
                              }}
                            >
                              +
                            </motion.button>
                          </MotionConfig>
                        </Stack>

                        {isProductAlreadyInCart ? (
                          <button
                            style={{
                              padding: "10px 15px",
                              backgroundColor: "#6a89a7",
                              borderRadius: "1rem",
                              outline: "none",
                              border: "none",
                              cursor: "pointer",

                              color: "white",
                            }}
                            onClick={() => navigate("/cart")}
                          >
                            In Cart
                          </button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1 }}
                            onClick={handleAddToCart}
                            style={{
                              padding: "10px 15px",
                              backgroundColor: "#6a89a7",
                              borderRadius: "1rem",
                              outline: "none",
                              border: "none",
                              cursor: "pointer",

                              color: "white",
                            }}
                          >
                            Add To Cart
                          </motion.button>
                        )}

                        <motion.div
                          style={{
                            border: "1px solid grayText",
                            borderRadius: "1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            checked={isProductAlreadyinWishlist}
                            onChange={(e) => handleAddRemoveFromWishlist(e)}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                          />
                        </motion.div>
                      </Stack>
                    </Stack>
                  )}

                  <Stack
                    mt={3}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #6a89a7",
                      borderRadius: "7px",
                    }}
                  >
                    <Stack
                      p={2}
                      flexDirection={"row"}
                      alignItems={"center"}
                      columnGap={"1rem"}
                      width={"100%"}
                      justifyContent={"flex-start"}
                    >
                      <Box>
                        <LocalShippingOutlinedIcon />
                      </Box>
                      <Stack>
                        <Typography>Free Delivery</Typography>
                        <Typography>
                          Enter your postal for delivery availability
                        </Typography>
                      </Stack>
                    </Stack>
                    <hr style={{ width: "100%" }} />
                    <Stack
                      p={2}
                      flexDirection={"row"}
                      alignItems={"center"}
                      width={"100%"}
                      columnGap={"1rem"}
                      justifyContent={"flex-start"}
                    >
                      <Box>
                        <CachedOutlinedIcon />
                      </Box>
                      <Stack>
                        <Typography>Return Delivery</Typography>
                        <Typography>Free 30 Days Delivery Returns</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Divider
                sx={{
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              />

              <Stack
                width={is1420 ? "auto" : "88rem"}
                p={is480 ? 2 : 0}
                sx={{
                  backgroundColor: "#f5f5f5",
                  padding: "1rem",
                  borderRadius: "8px",
                  height: "fit-content",
                }}
              >
                <Reviews productId={id} averageRating={averageRating} />
              </Stack>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
};
