import { useState } from "react";

function WorkoutCard() {
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [completedSetIndexes, setCompletedSetIndexes] = useState([]);
  const [setData, setSetData] = useState({});
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState(() =>
    JSON.parse(localStorage.getItem("repforgeWorkouts")) || []
  );

  const workoutSets = [
    { id: "hip-thrust-1", exercise: "Hip Thrust", label: "Set 1" },
    { id: "hip-thrust-2", exercise: "Hip Thrust", label: "Set 2" },
    { id: "hip-thrust-3", exercise: "Hip Thrust", label: "Set 3" },
    { id: "hip-thrust-4", exercise: "Hip Thrust", label: "Set 4" },
  ];

  const completeSet = (setId) => {
    const currentSet = setData[setId];

    if (!currentSet?.weight || !currentSet?.reps) {
      alert("Please enter weight and reps before completing the set.");
      return;
    }

    setCompletedSetIndexes((previousSets) => {
      if (previousSets.includes(setId)) {
        return previousSets;
      }

      return [...previousSets, setId];
    });
  };

  const updateSetData = (setId, field, value) => {
    setSetData((previousData) => ({
      ...previousData,
      [setId]: {
        ...previousData[setId],
        [field]: value,
      },
    }));
  };

  const calculateVolume = () => {
    return Object.values(setData).reduce((total, set) => {
      const weight = Number(set.weight) || 0;
      const reps = Number(set.reps) || 0;

      return total + weight * reps;
    }, 0);
    };
const finishWorkout = () => {
  if (completedSetIndexes.length === 0) {
    alert("Complete at least one set before finishing");
    return;
  }
const workout = {
  date: new Date().toISOString(),
  exercises: workoutSets
    .filter((set) => completedSetIndexes.includes(set.id))
    .map((set) => ({
      ...set,
      ...setData[set.id],
    })),
  completedSets: completedSetIndexes,
  totalVolume: calculateVolume()
};

const existingWorkouts =
JSON.parse(localStorage.getItem("repforgeWorkouts")) || [];

existingWorkouts.push(workout);

localStorage.setItem(
  "repforgeWorkouts",
  JSON.stringify(existingWorkouts)
);

setWorkoutHistory(existingWorkouts);
setWorkoutFinished(true);
alert("Workout saved");
};

  return (
    <div className="workout-card">
      <h2>Today's workout</h2>
      <p>Glutes, quads and hamstrings</p>

      <div className="exercise">
        <span>Leg extension</span>
        <span>2 x 12-15</span>
      </div>

      <div className="exercise">
        <span>Hamstring curls</span>
        <span>2 x 12-15</span>
      </div>

      <div className="exercise">
        <span>Hip thrust</span>
        <span>4 x 6-8</span>
      </div>

      <div className="exercise">
        <span>Hack squat</span>
        <span>4 x 6-8</span>
      </div>

      <div className="exercise">
        <span>RDL</span>
        <span>3 x 10-12</span>
      </div>

      <div className="exercise">
        <span>Leg press</span>
        <span>3 x 10-12</span>
      </div>

      

      <button className="start-button" onClick={() => setWorkoutStarted(true)}>
        {workoutStarted ? "Workout in Progress 🔥" : "Start Workout"}
      </button>
      {workoutStarted && !workoutFinished && (
<button className="finish-button"
onClick={finishWorkout}
>
  Finish Workout 
</button>
)}
<div className="workout-history">
  <h2>Workout History 📈</h2>

  {workoutHistory.length === 0 ? (
    <p>No workouts saved yet.</p>
  ) : (
    workoutHistory.map((workout, index) => (
      <div className="history-item" key={index}>
        <h3>
          Workout {index + 1}
        </h3>

        <p>
          Volume: {workout.totalVolume} kg
        </p>

        <p>
          Sets Completed: {workout.completedSets.length}
        </p>

        <p>
          {new Date(workout.date).toLocaleDateString()}
        </p>
      </div>
    ))
  )}
</div>

      {workoutStarted && (
        <div className="workout-tracker">
          <h3>Hip thrust</h3>
          <p>4 sets x 6-8 reps</p>

          {workoutSets.map((set) => {
            const isCompleted = completedSetIndexes.includes(set.id);

            return (
              <div className={`set ${isCompleted ? "completed" : ""}`} key={set.id}>
                <span>{set.label}</span>
                <div className="set-inputs">
                  <input
                    type="number"
                    placeholder="kg"
                    value={setData[set.id]?.weight || ""}
                    onChange={(event) =>
                      updateSetData(set.id, "weight", event.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="reps"
                    value={setData[set.id]?.reps || ""}
                    onChange={(event) =>
                      updateSetData(set.id, "reps", event.target.value)
                    }
                  />
                </div>
                <button onClick={() => completeSet(set.id)}>
                  {isCompleted ? "✓ Completed" : "Complete"}
                </button>
              </div>
            );
          })}
          <div className="workout-volume">
  <h3>Total Volume</h3>
  <p>{calculateVolume()} kg</p>
</div>
        </div>
      )}
    </div>
  );
}

export default WorkoutCard;