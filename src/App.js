import React from "react";
import { Logo, Dashboard } from "./components";
import StockProvider from "./context/StockProvider";

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light shadow-sm">
        <Logo />
      </nav>

      <StockProvider>
        <Dashboard />
      </StockProvider>
    </div>
  );
}

export default App;
