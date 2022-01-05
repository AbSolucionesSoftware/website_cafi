import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, CircularProgress, Grid } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
//import { LOGEAR_USUARIO } from '../../gql/Catalogos/usuarios';
import SnackBarMessages from '../SnackBarMessages';
//import jwt_decode from 'jwt-decode';
import Fade from '@material-ui/core/Fade';
import {Link} from 'react-router-dom'
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//import ab from '../../img/abLogo.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
 
}));

export default function LayoutHome(props) {
	const classes = useStyles();
	const sesion = localStorage.getItem('sesionCafi');
	const [ datos, setDatos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ alert, setAlert ] = useState({ message: 'dfsdfsdfsd', status: '', open: true });
	const [ showPassword, setShowPassword ] = useState(false);
    
	const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

	return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}    >
                    <Box justifyContent="flex-end" display={'flex'}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                         ENTRAR
                    </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            
                        >
                            <MenuItem onClick={handleClose}  ><Link to='/login'>Iniciar sesión</Link></MenuItem>
                            
                        </Menu>
                    </Box>    
                </Grid> 
                <Grid item xs={12}>      
                   <div style={{ width:'100%', height:250}}  />
                </Grid>        
            </Grid>            

        </div>
	);
}