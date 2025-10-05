import { Thermometer } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-800 bg-accent  py-4 px-6 flex items-center justify-between text-white">
      <div className="flex items-center gap-2">
        <Thermometer className="text-blue-400" />
        <h1 className="text-lg font-semibold tracking-wide">
          Perscpective Predictors Labs
        </h1>
      </div>
    </header>
  );
};

export default Header;
