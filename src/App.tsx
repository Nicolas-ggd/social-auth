import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PrivateRoutes } from "./utils/PrivateRoutes";
import { Auth } from "./components/Auth/Auth";
import { Page404 } from "./components/404/Page404";
import { SignIn } from "./components/Auth/SignIn/SignIn";
import { Dashboard } from "./components/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/" element={<Auth />}></Route>
        <Route path="*" element={<Page404 />}></Route>
        <Route path="/verify" element={<SignIn />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
