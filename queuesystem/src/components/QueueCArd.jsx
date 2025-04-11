import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import TaskBox from "./TaskBox";
import SetTimeOut from "./SetTimeOut";
import { useEffect, useState } from "react";

export default function QueueCard({ priority, queueKey, tasks = [], setTasks }) {
  const theme = useTheme();
  const isHighPriority = priority === "high";
  const backgroundColor = isHighPriority ? theme.palette.error.main : theme.palette.primary.main;

  const [activeTask, setActiveTask] = useState(tasks[0]);

  useEffect(() => {
    if (tasks.length > 0) {
      setActiveTask(tasks[0]);
    } else {
      setActiveTask(null); 
    }
  }, [tasks]);

  const handleTimeout = () => {
    if (tasks.length > 0) {
      const updatedTasks = tasks.slice(1);
      setTasks(updatedTasks); 
    }
  };

  return (
    <div>
      <Card
        sx={{
          width: "610px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          padding: "20px",
          backgroundColor: "secondary.main",
          border: "5px solid white",
          borderRadius: 0,
          color: theme.palette.common.white,
        }}
      >
        <Typography variant="h8" alignSelf="center" marginBottom={1}>
          {isHighPriority ? "High Priority Queue" : `Regular Queue ${queueKey}`}
        </Typography>

        <Typography variant="body2" color="inherit" marginBottom={1}>
          Queue List:
        </Typography>

        <Box
          container
          height={20}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {tasks.map((task, index) => (
            <TaskBox
              key={index}
              taskNumber={task.taskNumber}
              isQueueCard={true}
              backgroundColor={backgroundColor}
            />
          ))}
        </Box>

        <Typography variant="body2" color="inherit" marginTop={1} marginBottom={2}>
          Duration
        </Typography>
        <Box container height={20}>
          {activeTask && (
            <Box sx={{ display: "flex" }}>
              <SetTimeOut
                key={activeTask.taskNumber}
                taskNumber={activeTask.taskNumber}
                onTimeout={handleTimeout}
                hasTasks={tasks.length > 0}
              />
            </Box>
          )}
        </Box>
      </Card>
    </div>
  );
}