import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import { AppRoutes } from "./AppRoutes"
function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <AppRoutes></AppRoutes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
