import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

const App = () => {
  return (
    <div>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default App;
