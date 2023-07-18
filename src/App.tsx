import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { SignIn } from "./Auth/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
