
import React, { useState } from 'react';
import {  Link, Box, Container, TextField, CircularProgress, Grid } from '@material-ui/core';
import { AppBar, IconButton, Drawer, List, Divider, Toolbar, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Business from '@mui/icons-material/Business';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';

//import { LOGEAR_USUARIO } from '../../gql/Catalogos/usuarios';
import SnackBarMessages from '../SnackBarMessages';
//import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Link as RouterLink, useLocation } from 'react-router-dom';

import DashboardMain from '../Pages/Dashboard/DashboardMain';
import ErrorPage from '../ErrorPage';
//import ab from '../../img/abLogo.jpeg'
import Sucursales from '../Pages/Sucursales/Sucursales';
const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
 
}));


export default function LayoutDashBoard(props) {
	const { window } = props;

    const classes = useStyles();
    const navigate = useNavigate();
	const sesion = localStorage.getItem('sesionCafi');

	const [ loading, setLoading ] = useState(false);
	const [ alert, setAlert ] = useState({ message: '', status: '', open: false });
    const [titleAppBar, setTitleAppBar] = useState('Sucursales');
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <Toolbar />

            <Divider />
            <List>

            <ListItem button 
                onClick={
                    () => {
                        navigate('/dashboard/sucursales')
                        setTitleAppBar('Sucursales')
                    }
                }
                
            >
                    <ListItemIcon>
                        <Business />
                    </ListItemIcon>
                    <ListItemText primary={'Sucursales'} />
                </ListItem>
               
            </List>
            <Divider />
           
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
	
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
              
            <AppBar
                position="fixed"
                sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                }}
            >

                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  {titleAppBar}
                </Typography>
                </Toolbar>
         
             
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              
                <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
                >
                {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                    >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                position="fixed"
                 
                sx={{ flexGrow: 1, p: 3,ml: { sm: `${drawerWidth}px` }, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
            <Toolbar />
        
                <Routes>
                    
                    <Route index   element={<Navigate to="/dashboard/sucursales" />} />
                    <Route path={'/sucursales'}   element={<Sucursales />} />
                    <Route path={'/*'}   element={<ErrorPage />} />
                    
                </Routes> 
            </Box>
            <SnackBarMessages alert={alert} setAlert={setAlert} />
        </Box>
        
	);
}
