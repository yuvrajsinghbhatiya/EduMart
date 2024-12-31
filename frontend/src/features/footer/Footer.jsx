import React from "react";
import {
  Stack,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { QRCodePng, appStorePng, googlePlayPng } from "../../assets";

export const Footer = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
        padding: is700 ? "1rem" : "3rem",
        rowGap: "2rem",
        justifyContent: "space-between",
      }}
    >
      {/* Upper Section */}
      <Stack
        direction={is700 ? "column" : "row"}
        justifyContent="space-around"
        alignItems={is700 ? "flex-start" : "center"}
        rowGap="2rem"
        flexWrap="wrap"
      >
        {/* Subscription */}
        <Stack rowGap="1rem">
          <Typography variant="h6">Exclusive</Typography>
          <Typography>Subscribe to get 10% off your first order</Typography>
          <TextField
            placeholder="Enter your email"
            sx={{
              border: "1px solid white",
              borderRadius: "6px",
              "& .MuiInputBase-input": { color: "whitesmoke" },
            }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SendIcon sx={{ color: theme.palette.primary.light }} />
                </IconButton>
              ),
            }}
          />
        </Stack>

        {/* Support */}
        <Stack rowGap="0.5rem">
          <Typography variant="h6">Support</Typography>
          <Typography>123 Rajpur Road, Uttarakhand</Typography>
          <Typography>edumart@support.in</Typography>
          <Typography>+91-98765-43210</Typography>
        </Stack>

        {/* Download App */}
        <Stack rowGap="1rem">
          <Typography variant="h6">Download App</Typography>
          <Stack direction="row" columnGap="1rem">
            <img
              src={QRCodePng}
              alt="QR Code"
              style={{ width: "80px", height: "80px" }}
            />
            <Stack>
              <img
                src={googlePlayPng}
                alt="Google Play"
                style={{ width: "120px", cursor: "pointer", marginBottom: ".5rem" }}
              />
              <img
                src={appStorePng}
                alt="App Store"
                style={{ width: "120px", cursor: "pointer" }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Lower Section */}
      <Stack alignItems="center">
        <Typography >
          &copy; Edumart {new Date().getFullYear()}. All rights reserved
        </Typography>
      </Stack>
    </Stack>
  );
};
