import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VideoCard from "../components/VideoCard";
import { SearchOutlined } from "@mui/icons-material";
import { fetchAerialVideoByID, renderAerialVideo } from "../api/AeiralApi";
import Swal from "sweetalert2";

const Landing = () => {
  const [aerialVideos, setAerialVideos] = useState([]);
  const [searchResult, setSearchResult] = useState({
    state: "",
    found: false,
    isLoading: false,
    isOpen: true,
    type: "success",
  });
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchResult({
      ...searchResult,
      isLoading: true,
    });
    const data = new FormData(e.currentTarget);
    const address = data.get("address");
    const result = await renderAerialVideo(address);
    if (result?.state === "ACTIVE" && result?.metadata) {
      const video = await fetchAerialVideoByID(
        result.metadata.videoId,
        address
      );
      setAerialVideos((prev) => [...prev, video]);
      setSearchResult({
        ...searchResult,
        isLoading: false,
      });
    } else if (result?.state === "PROCESSING" && result?.metadata) {
      setSearchResult({
        ...searchResult,
        isLoading: false,
      });
      Swal.fire("Processing", "Processing video", "info", {
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Error", "No video found", "error", {
        showConfirmButton: false,
        timer: 2000,
      });
      setSearchResult({
        ...searchResult,
        isLoading: false,
      });
    }
  };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: { xs: 2, md: 5 },
        }}
      >
        <Box
          sx={{
            width: { xs: 60, md: 100 },
          }}
        >
          <img
            width="100%"
            src="https://seeklogo.com/images/G/google-earth-logo-2C3999EDF5-seeklogo.com.png"
            alt="logo"
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: 20, md: 30 },
          }}
        >
          Google Aerial View API
        </Typography>
      </Box>
      <Box
        onSubmit={handleSearch}
        component={"form"}
        sx={{ mb: 5, display: "flex" }}
      >
        <TextField
          fullWidth
          label="Address"
          name="address"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          disabled={searchResult.isLoading}
          startIcon={
            searchResult.isLoading ? (
              <CircularProgress size={30} />
            ) : (
              <SearchOutlined size={30} />
            )
          }
          variant="contained"
          size="large"
          mt={2}
        >
          Serach
        </Button>
      </Box>
      {/* <VideoTable videos={videos} /> */}
      <Grid container spacing={2} my={3}>
        {aerialVideos.map((video, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Landing;
