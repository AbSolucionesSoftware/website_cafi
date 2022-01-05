import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import theme from './config/colors';

import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import ErrorPage from './components/ErrorPage';
import LayoutDashboard from './components/Layouts/LayoutDashBoard';

import PageHome from './components/Pages/PageHome';
import PageLogin from './components/Pages/PageLogin';
import DashboardMain from './components/Pages/Dashboard/DashboardMain';
import Sucursales from './components/Pages/Sucursales/Sucursales';

function App() {
  
  return (
    <Box height='100vh' >
			<ApolloProvider client={client}>
				<div className="App" >
					<ThemeProvider theme={theme}>
						<CssBaseline />
              <Router>
                <Routes>
                  <Route index   element={<PageHome />} />
                  <Route path={'/login'}   element={<PageLogin />} />
                  <Route path={'/dashboard'}   element={<LayoutDashboard />} >
                    <Route path={'/dashboard/sucursales'}  />
                    
                  </Route>
                  <Route path={'*'}   element={<ErrorPage />} />
                  
                </Routes>
              </Router>
					</ThemeProvider>
				</div>
			</ApolloProvider>
		</Box>
  );
}


export default App;
