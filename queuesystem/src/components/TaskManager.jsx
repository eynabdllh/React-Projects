  import { useState, useCallback } from "react";
  import Grid from "@mui/material/Grid2";
  import { Button, Box, Typography } from "@mui/material";
  import TaskBox from "./TaskBox";
  import QueueCard from "./QueueCArd";
  import Stack from "@mui/material/Stack";

  const getRandomDuration = () => Math.floor(Math.random() * (100 - 15 + 1)) + 15;
  const getRandomPriority = () => (Math.random() < 0.3 ? "high" : "normal");

  export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [highPriorityQueue, setHighPriorityQueue] = useState([]);
    const [normalPriorityQueues, setNormalPriorityQueues] = useState([[], [], []]);

    const addRandomTask = () => {
      const newTask = {
        taskNumber: getRandomDuration(),
        priority: getRandomPriority(),
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const admitTasks = useCallback(() => {
      const currentTasks = ensureArray(tasks);

      if (currentTasks.length === 0) return;

      const [task, ...remainingTasks] = currentTasks;
      if (task.priority === "high") {
        setHighPriorityQueue((prevQueue) => ensureArray(prevQueue).concat(task));
      } else {
        const minIndex = normalPriorityQueues
          .map((queue) => ensureArray(queue).reduce((acc, task) => acc + task.taskNumber, 0))
          .indexOf(
            Math.min(
              ...normalPriorityQueues.map((queue) =>
                ensureArray(queue).reduce((acc, task) => acc + task.taskNumber, 0)
              )
            )
          );
        setNormalPriorityQueues((prevQueues) => {
          const newQueues = [...ensureArray(prevQueues)];
          newQueues[minIndex] = ensureArray(newQueues[minIndex]).concat(task);
          return newQueues;
        });
      }

      setTasks(remainingTasks);
    }, [tasks, normalPriorityQueues]);

    return (
      <Grid
        container
        columns={2}
        padding={2}
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "60%",
            border: 2,
            borderColor: "#3F3F3F",
            boxShadow: 4,
            padding: 2,
          }}
        >
          <Stack direction="row" spacing={3} justifyContent={"center"}>
            <Button onClick={addRandomTask} variant="contained" color="secondary">
              Add Random Task
            </Button>
            <Button onClick={admitTasks} variant="contained" color="success">
              Admit Task
            </Button>
          </Stack>
          <Typography variant="h4" color="white" paddingTop={5}>
            Task Queue
          </Typography>
          <Box
            sx={{
              marginY: 5,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            {tasks.map((task, index) => (
              <TaskBox key={index} taskNumber={task.taskNumber} priority={task.priority} />
            ))}
          </Box>
        </Box>
        <Grid
          container
          direction="row"
          spacing={0}
          sx={{
            height: "100%",
            width: "40%",
            display: "flex",
            padding: 2,
            border: 2,
            borderColor: "#3F3F3F",
            boxShadow: 4,
            flexDirection: "row",
            bgcolor: "#0A2345",
            overflowX: "auto",
          }}
        >
          <QueueCard
            priority={"high"}
            tasks={highPriorityQueue}
            setTasks={setHighPriorityQueue}
          />
          {normalPriorityQueues.map((queue, index) => (
            <QueueCard
              key={index}
              queueKey={index + 1}
              tasks={queue}
              setTasks={(newTasks) => {
                setNormalPriorityQueues((prevQueues) => {
                  const newQueues = [...prevQueues];
                  newQueues[index] = ensureArray(newTasks);
                  return newQueues;
                });
              }}
            />
          ))}
        </Grid>
      </Grid>
    );
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value : [];
  }