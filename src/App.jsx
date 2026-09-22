import { useState, useEffect } from "react";
import StatCard from "./components/StatCard";
import WorkoutCard from "./components/WorkoutCard";
import "./App.css";

function App() {
  const [workoutCount, setWorkoutCount] = useState(0);
  const [personalRecords, setPersonalRecords] = useState([
    { exercise: "Hip thrust", weight: "100kg" },
    { exercise: "Romanian Deadlift", weight: "60kg" },
    { exercise: "Shoulder press", weight: "35ccnkg" },
    { exercise: "Hammer curls", weight: "20kg" },
  ]);

  useEffect(() => {
    const savedWorkouts =
      JSON.parse(localStorage.getItem("repforgeWorkouts")) || [];

    setWorkoutCount(savedWorkouts.length);
  }, []);

  return (
    <main className="app">
      <div className="dashboard">
        <h1>RepForge</h1>
        <p>Your workout. Your progress. Your strength.</p>

        <section className="stats" aria-label="Workout statistics">
          <StatCard
            title="Workouts Completed"
            value={String(workoutCount)}
            icon="💪"
          />

          <StatCard
            title="Current Streak"
            value="7-days"
            icon="🏋️‍♂️"
          />

          <StatCard
            title="Personal Records"
            value={String(personalRecords.length)}
            icon="🏆"
          />
        </section>

        <section className="pr-section" aria-label="Personal records list">
          <h2>Personal Records</h2>
          <ul className="pr-list">
            {personalRecords.map((record) => (
              <li key={record.exercise} className="pr-item">
                <span>{record.exercise}</span>
                <strong>{record.weight}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <WorkoutCard />
    </main>
  );
}

export default App;
