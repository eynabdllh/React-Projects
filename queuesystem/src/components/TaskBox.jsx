  import { Box, Typography } from "@mui/material";
  import { useTheme } from "@mui/material/styles";

  export default function TaskBox({ priority, taskNumber, isQueueCard = false, backgroundColor }) {
    const theme = useTheme();

    const isHighPriority = priority === "high";
    const borderColor = isHighPriority ? theme.palette.error.light : theme.palette.grey[500];

    const boxSize = isQueueCard ? 20 : 80;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: boxSize,
          height: boxSize,
          borderRadius: 2,
          backgroundColor: backgroundColor || (isHighPriority ? theme.palette.error.main : theme.palette.primary.main),
          border: `1px solid ${borderColor}`,
        }}
      >
        <Typography color="white" fontSize={isQueueCard ? 10 : 15}>
          {taskNumber}
        </Typography>
      </Box>
    );
  }