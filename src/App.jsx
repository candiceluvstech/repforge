import StatCard from "./components/StatCard";
import WorkoutCard from "./components/WorkoutCard";
import "./App.css";

function App() {
  return (
    <main className="app">
      <div className="dashboard">
      <h1>RepForge</h1>
      <p>Your workout. Your progress. Your strength.</p>

      <section className="stats" aria-label="Workout statistics">
      <StatCard
      title="Workouts Completed"
      value="42"
      icon="💪"
      />

      <StatCard
      title="Current Streak"
      value="7-days"
      icon="🏋️‍♂️"
      />

      <StatCard
      title="Personal Records"
      value="5"
      icon="🏆"
      />
      </section>
      </div>

      <WorkoutCard />
    </main>
  );
}

export default App;
