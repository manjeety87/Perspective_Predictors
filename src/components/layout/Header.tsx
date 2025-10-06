import { Thermometer } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-800 bg-accent  py-4 px-6 flex items-center justify-between text-white">
      <div className="flex items-center gap-2">
        <img
          src="/logo/logo.png"
          alt="logo"
          className="h-12 w-12"
        />
        <h1 className="text-2xl font-semibold tracking-wide">Rain Check</h1>
      </div>
    </header>
  );
};

export default Header;
