import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
