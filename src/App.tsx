import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-black min-h-screen">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
