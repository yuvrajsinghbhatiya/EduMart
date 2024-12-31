import { Box, Button, Typography, Stack } from "@mui/material";
import { banner } from "../../../assets";

export const ProductBanner = () => {
  const handleScrollDown = () => {
    const productsSection = document.getElementById("products-section");

    if (productsSection) {
      const targetPosition = productsSection.offsetTop;

      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 800;
      let startTime = null;

      const smoothScroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollProgress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startPosition + distance * scrollProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(smoothScroll);
        }
      };

      requestAnimationFrame(smoothScroll);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ), url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          color: "#fff",
          textAlign: "center",
          maxWidth: "600px",
          padding: "0 1rem",
          alignItems: "center", // This will center the content
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Upgrade Your Learning Journey
        </Typography>
        <Typography variant="h6">Welcome to Our E-commerce Store!</Typography>
        <Button
  variant="outlined"
  size="medium"
  sx={{
    padding: "8px 12px",
    borderRadius: "1rem",
    cursor: "pointer",
    color: "white",
    width: "auto",
    maxWidth: "150px",
    borderColor: "#6a89a7", 
    "&:hover": {
      transform: "scale(1.1)", 
      
      transition: "transform 0.3s ease,  0.3s ease, 0.3s ease", 
    },
  }}
  onClick={handleScrollDown}
>
  Explore
</Button>

      </Stack>
    </Box>
  );
};
