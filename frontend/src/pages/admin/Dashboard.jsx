import { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import StarIcon from "@mui/icons-material/Star";

import api from "../../services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <PeopleIcon />,
      color: "#2563eb",
    },
    {
      title: "Total Stores",
      value: data.totalStores,
      icon: <StoreIcon />,
      color: "#16a34a",
    },
    {
      title: "Total Ratings",
      value: data.totalRatings,
      icon: <StarIcon />,
      color: "#f59e0b",
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item xs={12} md={4} key={card.title}>
            <Card
              sx={{
                transition: ".3s",
                cursor: "pointer",

                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <CardContent>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>

                    <Typography color="gray">
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight="bold"
                    >
                      {card.value}
                    </Typography>

                  </Box>

                  <Avatar
                    sx={{
                      bgcolor: card.color,
                      width: 65,
                      height: 65,
                    }}
                  >
                    {card.icon}
                  </Avatar>

                </Box>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={2}>

        <Grid item xs={12} md={8}>
          <Card>

            <CardContent>

              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
              >
                Welcome Admin 👋
              </Typography>

              <Typography color="text.secondary">
                Manage users, stores and ratings
                from this dashboard.
              </Typography>

            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>

            <CardContent>

              <Typography
                variant="h6"
                fontWeight="bold"
              >
                System Status
              </Typography>

              <Typography
                mt={2}
                color="green"
              >
                ● All Services Running
              </Typography>

            </CardContent>

          </Card>
        </Grid>

      </Grid>
    </>
  );
}