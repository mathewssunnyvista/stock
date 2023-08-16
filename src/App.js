import React from "react";
import { Logo, Dashboard } from "./components";
import { StockSymbolContext } from "./context";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import { BrowserRouter } from "react-router-dom";
// import moviesReducer from "./state/reducers/moviesReducer";store={store}

// import MoviePage from "./pages/MoviePage";

//let store = createStore(moviesReducer);

function App() {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light shadow-sm">
        <Logo />
      </nav>

      <StockSymbolContext.Provider
        value={{ selectedOptions, setSelectedOptions }}
      >
        <Dashboard />
      </StockSymbolContext.Provider>
    </div>

    // <div className="container">
    // <nav className="navbar navbar-light bg-light shadow-sm">
    //   <div className="container">
    //     <div class="row">
    //       <div class="col-12">
    //         <Logo />
    //       </div>
    //     </div>

    //     <div class="row">
    //       <div class="col-4">col-8</div>
    //       <div class="col-8">
    //         <Chart />
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    /* <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a href="#" class="nav-link active">
              Dashboard
            </a>
          </li>
        </ul>

        <ul class="nav nav-pills">
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Features
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Pricing
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              FAQs
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              About
            </a>
          </li>
        </ul> 
      </header> 
     </div>*/
  );
}

export default App;
