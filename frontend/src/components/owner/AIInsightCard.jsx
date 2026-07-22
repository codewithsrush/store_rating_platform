import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RefreshIcon from "@mui/icons-material/Refresh";
import api from "../../services/api";

export default function AIInsightCard({ storeId }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchInsight = async (force = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/owner/ai-summary/${storeId}${force ? "?refresh=true" : ""}`);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "AI insight unavailable right now.");
    } finally {
      setLoading(false);
    }
  };

  const total = data ? data.sentiment.positive + data.sentiment.neutral + data.sentiment.negative : 0;

  return (
    <Box sx={{ mt: 2, p: 2, borderRadius: 3, bgcolor: "#f0fdf4" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center">
          <AutoAwesomeIcon color="success" fontSize="small" />
          <Typography fontWeight="bold" variant="subtitle2">
            AI Insights
          </Typography>
        </Stack>

        {data && (
          <Button size="small" startIcon={<RefreshIcon />} onClick={() => fetchInsight(true)} disabled={loading}>
            Refresh
          </Button>
        )}
      </Stack>

      {!data && !loading && (
        <Button size="small" variant="outlined" sx={{ mt: 1 }} onClick={() => fetchInsight(false)}>
          Generate Insight
        </Button>
      )}

      {loading && (
        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Analyzing customer reviews...
          </Typography>
        </Stack>
      )}

      {error && (
        <Typography variant="body2" color="error" mt={1}>
          {error}
        </Typography>
      )}

      {data && !loading && (
        <>
          <Typography variant="body2" mt={1}>
            {data.summary}
          </Typography>

          {total > 0 && (
            <Box mt={1.5}>
              <Stack direction="row" spacing={1} mb={0.5}>
                <Chip size="small" color="success" label={`${data.sentiment.positive} positive`} />
                <Chip size="small" label={`${data.sentiment.neutral} neutral`} />
                <Chip size="small" color="error" label={`${data.sentiment.negative} negative`} />
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(data.sentiment.positive / total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
                color="success"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}