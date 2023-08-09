import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const VideoCard = ({ video }) => {
  const {
    uris: {
      IMAGE: { landscapeUri },
      MP4_HIGH,
    },
    state,
    address,
    metadata: { videoId },
  } = video;
  const handleDownload = () => {
    window.open(MP4_HIGH.landscapeUri, "_blank");
  };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
        <CardMedia
          component="video" // Use 'video' for playing the video
          controls // Show video controls
          src={MP4_HIGH.landscapeUri} // Use the video URL
          poster={landscapeUri} // Use the thumbnail as a poster image
          sx={{ height: "auto", width: "100%" }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6" component="div">
              Address: {address}
            </Typography>
            <Typography variant="body1">Video ID: {videoId}</Typography>
          </Box>
          <Button variant="contained" onClick={handleDownload}>
            Download
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoCard;
