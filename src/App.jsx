import { useState } from "react";
import StatCard from "./components/StatCard";
import WorkoutCard from "./components/WorkoutCard";
import "./App.css";

function App() {
  const savedWorkouts = JSON.parse(localStorage.getItem("repforgeWorkouts")) || [];
  const [workoutCount] = useState(savedWorkouts.length);
  const [personalRecords] = useState(() => {
    const records = {};
    savedWorkouts.forEach((workout) => {
      workout.exercises.forEach((set) => {
        const exerciseName = set.exercise;
        const weight = Number(set.weight) || 0;

        if (!records[exerciseName] || weight > records[exerciseName]) {
          records[exerciseName] = weight;
        }
      });
    });

    return Object.entries(records).map(([exercise, weight]) => ({
      exercise,
      weight: `${weight}kg`,
    }));
  });

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
