import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, TextField, Grid, Divider, OutlinedInput, InputAdornment, FormHelperText } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton } from '@material-ui/core';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AddIcon from '@material-ui/icons/Add';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SucursalesList from './SucursalesList';

const useStyles = makeStyles((theme) => ({
	formInputFlex: {
		display: 'flex',
		'& > *': {
			margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`
		},
		'& span': {
			color: 'red'
		}
	},
	color: {
		backgroundColor: theme.palette.background.paper,
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1)
		}
	},
	margin: {
		margin: theme.spacing(1)
	},
	iconSave: {
		zIndex: 10,
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(10)
	},
	contenedor: {
		padding: theme.spacing(5),
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(1)
		}
	}
}));

const steps = ['Datos sucursal', 'Usuario administrador'];
export default function Sucursales(props) {
    const classes = useStyles();    
	const [open, setOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(1);
	const [error, setError] = useState({ error: false, message: ''});
    const [ action, setAction ] = useState(false);
	const [ showPassword, setShowPassword ] = useState(false);
    const [ sucursales, setSucursales ] = useState([{_id: '1245HFJFH34', nombre_sucursal:'La bella tienda 1' },{_id: '1245HFYFH34', nombre_sucursal:'La bella tienda 2' }]);
    //const [ datosSucursal, setDatosSucursal ] = useState([]);
	const [usuario, setUsuario] = useState({
		nombre_usuario:'',
		telefono:'',
		password:'',
		repeatPassword:'',
		email:'',
		direccion: {
			calle: '',
			no_ext: '',
			no_int: '',
			codigo_postal: '',
			colonia: '',
			municipio: '',
			localidad: '',
			estado: '',
			pais: ''
		},
		turno_en_caja_activo: false,
		estado_usuario: true,
		accesos: {}
	});
	const [datosSucursal, setDatosSucursal] = useState({
    nombre_sucursal: "",
	descripcion:"",
    direccion: {
      calle: "",
      no_ext: "",
      no_int: "",
      codigo_postal: "",
      colonia: "",
      municipio: "",
      localidad: "",
      estado: "",
      pais: "",
    }
  });
    const handleClickOpen = () => {
		setOpen(!open);

	};
	const nuevaSucursal = () => {
		setOpen(!open);
		setDatosSucursal({
			 nombre_sucursal: "",
			descripcion:"",
			direccion: {
			calle: "",
			no_ext: "",
			no_int: "",
			codigo_postal: "",
			colonia: "",
			municipio: "",
			localidad: "",
			estado: "",
			pais: "",
			}
		});

	};
	
    const obtenerDatosSucursal = (e) => {
      
		if (action) {
			setDatosSucursal({
				...datosSucursal,
				[e.target.name]: e.target.value
			});
			return;
		}
	/* 	if (bloques.length === 0) {
			setDatosBloque({ ...datosBloque, [e.target.name]: e.target.value, preference: 1 });
		} else {
			const preference = bloques[bloques.length - 1].block.preference + 1; */
			setDatosSucursal({
				...datosSucursal,
				[e.target.name]: e.target.value,
				
			});
              console.log(e.target.name,  e.target.value)
		// }
	};
	const obtenerCamposDireccion = (e) => {
		setDatosSucursal({
		...datosSucursal,
		direccion: { ...datosSucursal.direccion, [e.target.name]: e.target.value },
		});
	};
	const obtenerDatosUsuario = (e) => {
      
		if (action) {
			setUsuario({
				...usuario,
				[e.target.name]: e.target.value
			});
			return;
		}
	/* 	if (bloques.length === 0) {
			setDatosBloque({ ...datosBloque, [e.target.name]: e.target.value, preference: 1 });
		} else {
			const preference = bloques[bloques.length - 1].block.preference + 1; */
			setUsuario({
				...usuario,
				[e.target.name]: e.target.value,
				
			});
              console.log(e.target.name,  e.target.value)
		// }
	};
	const obtenerCamposDireccionUsuario = (e) => {
		setUsuario({
		...usuario,
		direccion: { ...usuario.direccion, [e.target.name]: e.target.value },
		});
	};
    return (
        <Box boxShadow={5} className={classes.color} minHeight="80vh">
           <Box className={classes.contenedor}>
				<Box>
					<Button
						startIcon={<AddIcon style={{ fontSize: 30 }} />}
						variant="text"
						color="primary"
						className="addButton"
						onClick={nuevaSucursal}
					>
						Nueva Sucursal
					</Button>
				</Box>
				
			</Box> 
            <Dialog open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title" fullWidth maxHeight='md' maxWidth='md'>
				<DialogContent>
      			<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
					
					return (
						<Step key={label} >
						<StepLabel >{label}</StepLabel>
						</Step>
					);
					})}
				</Stepper >	
				{
					(activeStep === 0) ? 
					<div>
					<Box sx={{ flexGrow: 1 }} mt={3} >
					<Grid container spacing={2}  direction="row" >
							<Grid item xs={4} md={5}>
								<Box>
									<Typography>
										Nombre de la sucursal
									</Typography>
									<TextField
										type="text"
										autoFocus
										variant="outlined"
										name="nombre_sucursal"
										size="small"
										value={ datosSucursal.nombre_sucursal ? datosSucursal.nombre_sucursal : ''}
										fullWidth
										onChange={obtenerDatosSucursal}
									/>
								</Box>
							</Grid>
							<Grid item xs={6} md={7}>	
								<Box>
									<Typography>
										Descripción
									</Typography>	
									<TextField
										type="text"
										name="descripcion"
										variant="outlined"
										value={datosSucursal.descripcion ? datosSucursal.descripcion: ''}
										fullWidth
										size="small"
										multiline
										rows={2}
										onChange={obtenerDatosSucursal}
									/>
								</Box>
							</Grid>
							
						</Grid>
					</Box>	
					<Box mt={2}>
						<Typography className={classes.subtitle}>
						<b>Domicilio sucursal</b>
						</Typography>
						<Divider />
					</Box>
					<Box sx={{ flexGrow: 1 }} mt={3}>
						<Grid container spacing={2}  direction="row" >
							<Grid item xs={4} md={5}>	
								<Box>
									<Typography>Calle</Typography>
									<TextField
									fullWidth
									size="small"
									name="calle"
									variant="outlined"
									
									value={
										datosSucursal.direccion.calle
										? datosSucursal.direccion.calle
										: ""
									}
									onChange={obtenerCamposDireccion}
									/>
								</Box>
							</Grid>
							<Grid item xs={2} md={3}>	
							<Box>
								<Typography>Num. Ext</Typography>
								<TextField
								fullWidth
								size="small"
								name="no_ext"
								variant="outlined"
								
								value={
									datosSucursal.direccion.no_ext
									? datosSucursal.direccion.no_ext
									: ""
								}
								onChange={obtenerCamposDireccion}
								/>
							</Box>
							</Grid>
							<Grid item xs={2} md={3}>	
							<Box>
								<Typography>Num. Int</Typography>
								<TextField
								fullWidth
								size="small"
								name="no_int"
								variant="outlined"
								
								value={
									datosSucursal.direccion.no_int
									? datosSucursal.direccion.no_int
									: ""
								}
								onChange={obtenerCamposDireccion}
								/>
							</Box>

							</Grid>
							<Grid item xs={3} md={4}>	
							<Box>
								<Typography>C.P. </Typography>
								<TextField
								fullWidth
								size="small"
								name="codigo_postal"
								variant="outlined"
								
								value={
									datosSucursal.direccion.codigo_postal
									? datosSucursal.direccion.codigo_postal
									: ""
								}
								onChange={obtenerCamposDireccion}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>	
							<Box>
								<Typography>Colonia</Typography>
								<TextField
								fullWidth
								size="small"
								name="colonia"
								variant="outlined"
								
								value={
									datosSucursal.direccion.colonia
									? datosSucursal.direccion.colonia
									: ""
								}
								onChange={obtenerCamposDireccion}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>	
							<Box>
								<Typography>Municipio</Typography>
								<TextField
								fullWidth
								size="small"
								name="municipio"
								variant="outlined"
								
								value={
									datosSucursal.direccion.municipio
									? datosSucursal.direccion.municipio
									: ""
								}
								onChange={obtenerCamposDireccion}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>
							<Box>
								<Typography>Localidad</Typography>
								<TextField
								fullWidth
								size="small"
								name="localidad"
								variant="outlined"
							
								value={
									datosSucursal.direccion.localidad
									? datosSucursal.direccion.localidad
									: ""
								}
								onChange={obtenerCamposDireccion}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>
							<Box>
								<Typography>Estado</Typography>
								<TextField
								fullWidth
								size="small"
								name="estado"
								variant="outlined"
								
								value={
									datosSucursal.direccion.estado
									? datosSucursal.direccion.estado
									: ""
								}
								onChange={obtenerCamposDireccion}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>
							<Box>
								<Typography>Pais</Typography>
								<TextField
								fullWidth
								size="small"
								name="pais"
								variant="outlined"
								
								value={
									datosSucursal.direccion.pais
									? datosSucursal.direccion.pais
									: ""
								}
								onChange={obtenerCamposDireccion}
								/>
							</Box>
							</Grid>	
						</Grid>	
					</Box>
					</div>
					:
					<div>
					<Box sx={{ flexGrow: 1 }} mt={3} >
					<Grid container spacing={2}  direction="row" >
							<Grid item xs={4} md={5}>
								<Box>
									<Typography>
										Nombre 
									</Typography>
									<TextField
										type="text"
										autoFocus
										variant="outlined"
										name="nombre_usuario"
										size="small"
										value={ usuario.nombre_usuario ? usuario.nombre_usuario : ''}
										fullWidth
										onChange={obtenerDatosUsuario}
									/>
								</Box>
							</Grid>
							<Grid item xs={4} md={5}>
								<Box>
									<Typography>
										E-mail 
									</Typography>
									<TextField
										type="text"
										autoFocus
										variant="outlined"
										name="email"
										size="small"
										value={ usuario.email ? usuario.email : ''}
										fullWidth
										onChange={obtenerDatosUsuario}
									/>
								</Box>
							</Grid>
							<Grid item xs={4} md={5}>
								<Box>
									<Typography>
										Teléfono
									</Typography>
									<TextField
										type="text"
										autoFocus
										variant="outlined"
										name="telefono"
										size="small"
										value={ usuario.telefono ? usuario.telefono : ''}
										fullWidth
										onChange={obtenerDatosUsuario}
									/>
								</Box>
							</Grid>
						</Grid>
					</Box>
					<Box mt={2}>
						<Divider />
							<form autoComplete="off" className={classes.formInputFlex}>
								<Box width="100%">
									<Typography>
										<span>* </span>Contraseña
									</Typography>
									<FormControl
										fullWidth
										size="small"
										error={
											error.error && !usuario.password ? (
												true
											) : error.error && error.message === 'Las contraseñas no coinciden' ? (
												true
											) : (
												false
											)
										}
										name="password"
										variant="outlined"
									>
										<OutlinedInput
											name="password"
											type={showPassword ? 'text' : 'password'}
											value={usuario.password ? usuario.password : ''}
											onChange={obtenerDatosUsuario}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														size="small"
														aria-label="toggle password visibility"
														onClick={() => setShowPassword(!showPassword)}
														onMouseDown={() => setShowPassword(!showPassword)}
													>
														{showPassword ? (
															<Visibility color="primary" />
														) : (
															<VisibilityOff color="primary" />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
										<FormHelperText>{error.message}</FormHelperText>
									</FormControl>
								</Box>
								<Box width="100%">
									<Typography>
										<span>* </span>Repetir contraseña
									</Typography>
									<FormControl
										fullWidth
										size="small"
										error={
											error.error && !usuario.password ? (
												true
											) : error.error && error.message === 'Las contraseñas no coinciden' ? (
												true
											) : (
												false
											)
										}
										name="repeatPassword"
										variant="outlined"
									>
										<OutlinedInput
											name="repeatPassword"
											type={showPassword ? 'text' : 'password'}
											value={usuario.repeatPassword ? usuario.repeatPassword : ''}
											onChange={obtenerDatosUsuario}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														size="small"
														aria-label="toggle password visibility"
														onClick={() => setShowPassword(!showPassword)}
														onMouseDown={() => setShowPassword(!showPassword)}
													>
														{showPassword ? (
															<Visibility color="primary" />
														) : (
															<VisibilityOff color="primary" />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
										<FormHelperText>{error.message}</FormHelperText>
									</FormControl>
								</Box>
							</form>
						<Divider />
					</Box>	
					<Box mt={2}>
						<Typography className={classes.subtitle}>
						<b>Domicilio </b>
						</Typography>
						<Divider />
					</Box>
					<Box sx={{ flexGrow: 1 }} mt={3}>
						<Grid container spacing={2}  direction="row" >
							<Grid item xs={4} md={5}>	
								<Box>
									<Typography>Calle</Typography>
									<TextField
									fullWidth
									size="small"
									name="calle"
									variant="outlined"
									
									value={
										usuario.direccion.calle
										? usuario.direccion.calle
										: ""
									}
									onChange={obtenerCamposDireccionUsuario}
									/>
								</Box>
							</Grid>
							<Grid item xs={2} md={3}>	
							<Box>
								<Typography>Num. Ext</Typography>
								<TextField
								fullWidth
								size="small"
								name="no_ext"
								variant="outlined"
								
								value={
									usuario.direccion.no_ext
									? usuario.direccion.no_ext
									: ""
								}
								onChange={obtenerCamposDireccionUsuario}
								/>
							</Box>
							</Grid>
							<Grid item xs={2} md={3}>	
							<Box>
								<Typography>Num. Int</Typography>
								<TextField
								fullWidth
								size="small"
								name="no_int"
								variant="outlined"
								
								value={
									usuario.direccion.no_int
									? usuario.direccion.no_int
									: ""
								}
								onChange={obtenerCamposDireccionUsuario}
								/>
							</Box>

							</Grid>
							<Grid item xs={3} md={4}>	
							<Box>
								<Typography>C.P. </Typography>
								<TextField
								fullWidth
								size="small"
								name="codigo_postal"
								variant="outlined"
								
								value={
									usuario.direccion.codigo_postal
									? usuario.direccion.codigo_postal
									: ""
								}
								onChange={obtenerCamposDireccionUsuario}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>	
							<Box>
								<Typography>Colonia</Typography>
								<TextField
								fullWidth
								size="small"
								name="colonia"
								variant="outlined"
								
								value={
									usuario.direccion.colonia
									? usuario.direccion.colonia
									: ""
								}
								onChange={obtenerCamposDireccionUsuario}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>	
							<Box>
								<Typography>Municipio</Typography>
								<TextField
								fullWidth
								size="small"
								name="municipio"
								variant="outlined"
								
								value={
									usuario.direccion.municipio
									? usuario.direccion.municipio
									: ""
								}
								onChange={obtenerCamposDireccionUsuario}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>
							<Box>
								<Typography>Localidad</Typography>
								<TextField
								fullWidth
								size="small"
								name="localidad"
								variant="outlined"
							
								value={
									usuario.direccion.localidad
									? usuario.direccion.localidad
									: ""
								}
								onChange={obtenerCamposDireccionUsuario}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>
							<Box>
								<Typography>Estado</Typography>
								<TextField
								fullWidth
								size="small"
								name="estado"
								variant="outlined"
								
								value={
									usuario.direccion.estado
									? usuario.direccion.estado
									: ""
								}
								onChange={obtenerCamposDireccionUsuario}
								/>
							</Box>
							</Grid>
							<Grid item xs={3} md={4}>
							<Box>
								<Typography>Pais</Typography>
								<TextField
								fullWidth
								size="small"
								name="pais"
								variant="outlined"
								
								value={
									usuario.direccion.pais
									? usuario.direccion.pais
									: ""
								}
								onChange={obtenerCamposDireccionUsuario}
								/>
							</Box>
							</Grid>	
						</Grid>	
					</Box>
					</div>
				}
					
					
      			
				</DialogContent>
				
			
				<DialogActions>
					<Button onClick={handleClickOpen} color="primary">
						Cancelar
					</Button>
					<Button onClick={() => console.log(datosSucursal)} color="primary" variant="contained">
						Guardar
					</Button>
				</DialogActions>
				
			</Dialog>
			
           <SucursalesList  sucursales={sucursales} setSucursales={setSucursales} open={open} setOpen={setOpen} datosSucursal={datosSucursal} setDatosSucursal={setDatosSucursal} action={action} setAction={setAction} /> 
        </Box>
	);
}