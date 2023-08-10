import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VideoCard from "../components/VideoCard";
import { AddCircleOutline, SearchOutlined } from "@mui/icons-material";
import { fetchAerialVideoByID, renderAerialVideo } from "../api/AeiralApi";
import Swal from "sweetalert2";
import VideoTable from "../components/VideoTable";
const columns = [
  { id: "address", label: "Address", minWidth: 170 },
  { id: "state", label: "Status", minWidth: 100 },
  { id: "videoid", label: "Video ID", minWidth: 100 },
  { id: "get", label: "Submit", minWidth: 100 },
];

function createData(address, state, videoid, get) {
  return { address, state, videoid, get };
}

const Landing = () => {
  const [aerialVideos, setAerialVideos] = useState([]);
  const [searchResult, setSearchResult] = useState({
    state: "",
    found: false,
    isLoading: false,
    isOpen: true,
    type: "success",
  });
  const [addresses, setAddresses] = useState([
    {
      address: "",
      isLoading: false,
      state: "",
      videoId: "",
    },
  ]);
  const rows = addresses.map((address) => {
    return createData(address.address, address.state, address.videoId);
  });
  const handleSearch = async (e, address) => {
    e.preventDefault();
    setAddresses((prev) => {
      const updatedAddresses = [...prev];
      const index = updatedAddresses.findIndex((a) => a.address === address);
      updatedAddresses[index].isLoading = true;
      return updatedAddresses;
    });

    const result = await renderAerialVideo(address);

    if (result?.state === "ACTIVE" && result?.metadata) {
      const video = await fetchAerialVideoByID(
        result.metadata.videoId,
        address
      );
      setAddresses((prev) => {
        const updatedAddresses = [...prev];
        const index = updatedAddresses.findIndex((a) => a.address === address);
        updatedAddresses[index].isLoading = false;
        updatedAddresses[index].state = result.state;
        updatedAddresses[index].videoId = result.metadata.videoId;
        return updatedAddresses;
      });
      setAerialVideos((prev) => [...prev, video]);
    } else if (result?.state === "PROCESSING" && result?.metadata) {
      setAddresses((prev) => {
        const updatedAddresses = [...prev];
        const index = updatedAddresses.findIndex((a) => a.address === address);
        updatedAddresses[index].isLoading = false;
        updatedAddresses[index].state = result.state;
        updatedAddresses[index].videoId = result.metadata.videoId;
        return updatedAddresses;
      });
    } else {
      setAddresses((prev) => {
        const updatedAddresses = [...prev];
        const index = updatedAddresses.findIndex((a) => a.address === address);
        updatedAddresses[index].isLoading = false;
        updatedAddresses[index].state = result.state || "NOT_FOUND";
        updatedAddresses[index].videoId =
          result?.metadata?.videoId || "Not found";
        return updatedAddresses;
      });
    }
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        address: "",
        isLoading: false,
        state: "",
        videoId: "",
      },
    ]);
  };

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      address: value,
    };
    setAddresses(updatedAddresses);
  };
  console.log(addresses);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: { xs: 2, md: 2 },
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
      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={handleAddAddress}
        sx={{
          marginLeft: "auto",
          display: "flex",
        }}
      >
        Add new address
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((address, index) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={index}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    required
                    value={address.address}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    sx={{
                      mt: 1,
                    }}
                  />
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        bgcolor:
                          address.state === "ACTIVE"
                            ? "green"
                            : address.state === "PROCESSING"
                            ? "red"
                            : "",
                        color: "white",
                        padding: 1,
                        borderRadius: 2,
                      }}
                    >
                      {address.state}
                    </Typography>
                  </TableCell>
                  <TableCell>{address.videoid}</TableCell>
                  <TableCell>
                    <Button
                      disabled={address.isLoading || !address.address}
                      startIcon={
                        address.isLoading ? (
                          <CircularProgress />
                        ) : (
                          <SearchOutlined />
                        )
                      }
                      variant="outlined"
                      // mt={2}
                      onClick={(e) => handleSearch(e, address.address)}
                    >
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

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
