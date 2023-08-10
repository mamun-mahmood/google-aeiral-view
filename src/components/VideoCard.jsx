import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
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
        <CardContent>
          <Typography variant="h6" component="div">
            {address}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="body1"
              sx={{
                width: "70%",
                wordWrap: "break-word",
              }}
            >
              {videoId}
            </Typography>
            <Button variant="contained" size="large" onClick={handleDownload}>
              Download
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoCard;
