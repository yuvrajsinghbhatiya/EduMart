import {
  Avatar,
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../UserSlice";
import {
  addAddressAsync,
  resetAddressAddStatus,
  resetAddressDeleteStatus,
  resetAddressUpdateStatus,
  selectAddressAddStatus,
  selectAddressDeleteStatus,
  selectAddressErrors,
  selectAddressStatus,
  selectAddressUpdateStatus,
  selectAddresses,
} from "../../address/AddressSlice";
import { Address } from "../../address/components/Address";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const status = useSelector(selectAddressStatus);
  const userInfo = useSelector(selectUserInfo);
  const addresses = useSelector(selectAddresses);
  const theme = useTheme();
  const [addAddress, setAddAddress] = useState(false);

  const addressAddStatus = useSelector(selectAddressAddStatus);
  const addressUpdateStatus = useSelector(selectAddressUpdateStatus);
  const addressDeleteStatus = useSelector(selectAddressDeleteStatus);

  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (addressAddStatus === "fulfilled") {
      toast.success("Address added");
    } else if (addressAddStatus === "rejected") {
      toast.error("Error adding address, please try again later");
    }
  }, [addressAddStatus]);

  useEffect(() => {
    if (addressUpdateStatus === "fulfilled") {
      toast.success("Address updated");
    } else if (addressUpdateStatus === "rejected") {
      toast.error("Error updating address, please try again later");
    }
  }, [addressUpdateStatus]);

  useEffect(() => {
    if (addressDeleteStatus === "fulfilled") {
      toast.success("Address deleted");
    } else if (addressDeleteStatus === "rejected") {
      toast.error("Error deleting address, please try again later");
    }
  }, [addressDeleteStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetAddressAddStatus());
      dispatch(resetAddressUpdateStatus());
      dispatch(resetAddressDeleteStatus());
    };
  }, []);

  const handleAddAddress = (data) => {
    const address = { ...data, user: userInfo._id };
    dispatch(addAddressAsync(address));
    setAddAddress(false);
    reset();
  };

  return (
    <Stack
      height={"calc(100vh - 4rem)"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Stack
        component={is480 ? "" : Paper}
        elevation={1}
        width={is900 ? "100%" : "50rem"}
        p={2}
        mt={is480 ? 0 : 5}
        rowGap={2}
        columnGap={5}
        flexDirection={is480 ? "column" : "row"} // Adjust layout for mobile and desktop
        justifyContent={is480 ? "center" : "flex-start"}
        sx={{
          marginTop: "5rem",
        }}
      >
        {/* Left side - User details and Address Management */}
        <Stack
          bgcolor={theme.palette.primary.light} // Add background color
          color={theme.palette.primary.main}
          p={2}
          rowGap={2}
          borderRadius={".6rem"}
          justifyContent={"center"}
          alignItems={"center"}
          width={is480 ? "100%" : "40%"} // Left section width
        >
          {/* User details */}
          <Stack
            bgcolor={theme.palette.primary.light}
            color={theme.palette.primary.main}
            p={3} // Increased padding for a larger section
            rowGap={2} // Added more gap between elements
            borderRadius={".6rem"}
            justifyContent={"center"}
            alignItems={"center"}
            width="100%" // Ensure it spans the full width of the parent container
          >
            <Avatar
              src="none"
              alt={userInfo?.name}
              sx={{ width: 90, height: 90 }} // Increased avatar size
            />
            <Typography variant="h5" fontWeight={600}sx={{ color: "#384959" }}>
              {userInfo?.name}
            </Typography>
            <Typography variant="body1"sx={{ color: "#384959" }}>{userInfo?.email}</Typography>
          </Stack>

          {/* Manage Addresses */}
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            columnGap={1}
            p={1}
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1" fontWeight={400} sx={{ color: "#384959" }}>
              Manage addresses
            </Typography>
            <Button
              onClick={() => setAddAddress(true)}
              size={is480 ? "small" : ""}
              variant="contained"
              style={{
                padding: ".5rem 1rem",
                backgroundColor: "#6a89a7",
                borderRadius: "1rem",
                outline: "none",
                border: "none",
                cursor: "pointer",
                color: "white",
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>

        {/* Right side - Address section */}
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          rowGap={3}
          width={is480 ? "100%" : "60%"} // Right section width
          bgcolor={theme.palette.background.paper} // Background color for the right side
          p={2} // Padding to give some space inside the right section
          borderRadius={".6rem"} // Optional, adds rounded corners to the right side
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "8px",
            height: "fit-content",
            marginTop: "2rem",
          }}
        >
          {/* Add address form - state dependent */}
          {addAddress && (
            <Stack
              width={"100%"}
              component={"form"}
              noValidate
              onSubmit={handleSubmit(handleAddAddress)}
              rowGap={2} // Add space between form elements
            >
              {/* Type Field */}
              <Stack>
                <Typography gutterBottom>Type</Typography>
                <TextField
                  placeholder="Eg. Home, Business"
                  {...register("type", { required: true })}
                  fullWidth // Makes the input span the full width
                />
              </Stack>

              {/* Street Field */}
              <Stack>
                <Typography gutterBottom>Street</Typography>
                <TextField
                  {...register("street", { required: true })}
                  fullWidth
                />
              </Stack>

              {/* Postal Code Field */}
              <Stack>
                <Typography gutterBottom>Postal Code</Typography>
                <TextField
                  type="number"
                  {...register("postalCode", { required: true })}
                  fullWidth
                />
              </Stack>

              {/* Country Field */}
              <Stack>
                <Typography gutterBottom>Country</Typography>
                <TextField
                  {...register("country", { required: true })}
                  fullWidth
                />
              </Stack>

              {/* Phone Number Field */}
              <Stack>
                <Typography gutterBottom>Phone Number</Typography>
                <TextField
                  type="number"
                  {...register("phoneNumber", { required: true })}
                  fullWidth
                />
              </Stack>

              {/* State Field */}
              <Stack>
                <Typography gutterBottom>State</Typography>
                <TextField
                  {...register("state", { required: true })}
                  fullWidth
                />
              </Stack>

              {/* City Field */}
              <Stack>
                <Typography gutterBottom>City</Typography>
                <TextField
                  {...register("city", { required: true })}
                  fullWidth
                />
              </Stack>

              {/* Submit and Cancel Buttons */}
              <Stack
                flexDirection={"row"}
                alignSelf={"flex-end"}
                columnGap={is480 ? 1 : 2}
                mt={2} // Add margin-top for spacing
              >
                <LoadingButton
                  loading={status === "pending"}
                  type="submit"
                  size={is480 ? "small" : ""}
                  variant="contained"
                  style={{
                    padding: ".5rem 1rem",
                    backgroundColor: "#6a89a7",
                    borderRadius: "1rem",
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  Add
                </LoadingButton>
                <Button
                  color="primary"
                  onClick={() => setAddAddress(false)}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: "16px",
                    textTransform: "none",
                    px: 2,
                    color: "#384959",
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          )}

          {/* Mapping on addresses */}
          <Stack width={"100%"} rowGap={2}>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <Address
                  key={address._id}
                  id={address._id}
                  city={address.city}
                  country={address.country}
                  phoneNumber={address.phoneNumber}
                  postalCode={address.postalCode}
                  state={address.state}
                  street={address.street}
                  type={address.type}
                />
              ))
            ) : (
              <Typography textAlign={"center"} mt={2} variant="body2">
                You have no added addresses
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
