import {
    Card,
    CardContent,
    Typography,
    Rating,
    Chip,
    Stack,
    Box,
    Divider,
    Button,
    TextField,
  } from "@mui/material";
  
  import StorefrontIcon from "@mui/icons-material/Storefront";
  import LocationOnIcon from "@mui/icons-material/LocationOn";
  import StarIcon from "@mui/icons-material/Star";
  import PersonIcon from "@mui/icons-material/Person";
  import { useState } from "react";
  
  export default function StoreCard({ store, onRate }) {
    const [rating, setRating] = useState(store.userRating || 0);
    const [comment, setComment] = useState(store.userComment || "");   
    
    const handleSubmit = () => {
      if (!rating) return;
      onRate(store.id, rating, comment);   
    };
  
    return (
      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          transition: "0.3s",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: 8,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg,#16a34a,#22c55e)",
            color: "#fff",
            p: 2,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <StorefrontIcon />
            <Typography variant="h6" fontWeight="bold">
              {store.name}
            </Typography>
          </Stack>
        </Box>
  
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon color="success" />
              <Typography color="text.secondary">
                {store.address}
              </Typography>
            </Stack>
  
            <Divider />
  
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight="bold">
                Overall Rating
              </Typography>
  
              <Chip
                color="warning"
                icon={<StarIcon />}
                label={store.overallRating ?? 0}
              />
            </Stack>
  
            <Divider />
  
            <Stack spacing={1}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <PersonIcon color="primary" />
                <Typography fontWeight="bold">
                  Your Rating
                </Typography>
              </Stack>
  
              <Rating
                value={rating}
                precision={1}
                size="large"
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />

            <TextField
              size="small"
              multiline
              minRows={2}
              placeholder="Optional: share your experience"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mt: 1 }}
            />
            </Stack>
  
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                py: 1.4,
                borderRadius: 3,
              }}
            >
              {store.userRating ? "Update Rating" : "Submit Rating"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }