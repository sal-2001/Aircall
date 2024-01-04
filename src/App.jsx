import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Inbox from "./pages/Inbox.jsx";
import Allcalls from "./pages/Allcalls.jsx";
import Archived from "./pages/Archived.jsx";

const App = () => {
  return (
    <Router>
      <div className="max-w-[1440px] mx-auto bg-white container">
        <Header />
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/allcalls" element={<Allcalls />} />
          <Route path="/archived" element={<Archived />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
