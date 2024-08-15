import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import routes from "./routes";
import AuthContext from "./contexts/authContext";
import DashboardPrivate from "./components/Privates/DashboardPrivate";
import store from "./Redux/store";

function App() {
  const mainUrl = "http://localhost:8000/api";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminInfos, setAdminInfos] = useState({});

  const queryClient = new QueryClient();
  
  const router = useRoutes(routes);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
          {router}
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
