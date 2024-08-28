import ErrorBoundary from "./Pages/ErrorBoundary"; // Adjust import based on your setup
import Login from "./Pages/Login";

function App() {
  return (
    <ErrorBoundary>
      <Login />
    </ErrorBoundary>
  );
}
export default App;
