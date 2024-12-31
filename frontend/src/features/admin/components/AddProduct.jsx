import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
} from "../../products/ProductSlice";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    if (productAddStatus === "fullfilled") {
      reset();
      toast.success("New product added");
      navigate("/admin/dashboard");
    } else if (productAddStatus === "rejected") {
      toast.error("Error adding product, please try again later");
    }
  }, [productAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, []);

  const handleAddProduct = (data) => {
    const newProduct = {
      ...data,
      images: [],
    };
    dispatch(addProductAsync(newProduct));
  };

  return (
    <Stack
      p={"0 16px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      <Stack
        width={is1100 ? "100%" : "60rem"}
        rowGap={4}
        mt={is480 ? 4 : 6}
        mb={6}
      >
        {/* Header with motion */}
        <Stack
          flexDirection={"row"}
          columnGap={is480 ? 0.3 : 1}
          alignItems={"center"}
        >
          <motion.div whileHover={{ x: -5 }}>
            <IconButton component={Link} to={"/admin/dashboard"}>
              <ArrowBackIcon fontSize={is480 ? "medium" : "large"} />
            </IconButton>
          </motion.div>
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "#f5f5f5",
              padding: ".5rem",
              borderRadius: "8px",
            }}
          >
            Add New Product
          </Typography>
        </Stack>
        <Divider />

        {/* Form */}
        <Stack
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleAddProduct)}
          rowGap={3}
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Title
            </Typography>
            <TextField
              {...register("title", { required: "Title is required" })}
            />
          </Stack>

          <Stack flexDirection={"row"} columnGap={2}>
            <FormControl fullWidth>
              <InputLabel id="brand-selection">Brand</InputLabel>
              <Select
                {...register("brand", { required: "Brand is required" })}
                labelId="brand-selection"
                label="Brand"
              >
                {brands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="category-selection">Category</InputLabel>
              <Select
                {...register("category", { required: "Category is required" })}
                labelId="category-selection"
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Description
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
            />
          </Stack>

          <Stack flexDirection={"row"} columnGap={2}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Price
              </Typography>
              <TextField
                type="number"
                {...register("price", { required: "Price is required" })}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Discount {is480 ? "%" : "Percentage"}
              </Typography>
              <TextField
                type="number"
                {...register("discountPercentage", {
                  required: "Discount percentage is required",
                })}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Stock Quantity
            </Typography>
            <TextField
              type="number"
              {...register("stockQuantity", {
                required: "Stock Quantity is required",
              })}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Thumbnail
            </Typography>
            <TextField
              {...register("thumbnail", { required: "Thumbnail is required" })}
            />
          </Stack>

          {/* Action buttons */}
          <Stack
            flexDirection={"row"}
            alignSelf={"flex-end"}
            columnGap={is480 ? 1 : 2}
          >
            <Button
              size={is480 ? "medium" : "large"}
              variant="contained"
              type="submit"
            >
              Add Product
            </Button>
            <Button
              size={is480 ? "medium" : "large"}
              variant="outlined"
              component={Link}
              to={"/admin/dashboard"}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddProduct;
