import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Interview from "./pages/Interview"
import Report from "./pages/Report"
import InterviewProvider from "./context/Interview"

const App = () => {
  return (
    <BrowserRouter>
      <InterviewProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview/:id" element={<Interview />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </InterviewProvider>
    </BrowserRouter>
  )
}

export default App