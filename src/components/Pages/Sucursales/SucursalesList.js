import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	IconButton,
	Typography,
	TextField,
	Grid,
	Hidden,
	Card,
	CardContent,
	Collapse,
	CardActions
} from '@material-ui/core';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DragIndicatorOutlinedIcon from '@material-ui/icons/DragIndicatorOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import Temas from './temas';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
//import clienteAxios from '../../../../../config/axios';
import Spin from '../../Spin/Spin';
import SnackBarMessages from '../../SnackBarMessages';



//import { CursoContext } from '../../../../../context/curso_context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
	margin: {
		marginRight: theme.spacing(5),
		marginLeft: theme.spacing(5),
		[theme.breakpoints.down('xs')]: {
			marginRight: theme.spacing(1),
			marginLeft: theme.spacing(1)
		}
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	}
}));

const reorder = (list, startIndex, endIndex) => {
	const newList = Array.from(list);
	const [ removed ] = newList.splice(startIndex, 1);
	newList.splice(endIndex, 0, removed);
	return newList;
};

export default function SucursalesList({ sucursales, setSucursales, open, setOpen, datosSucursal, setDatosSucursal, action, setAction }) {
	//const { datos, update, setUpdate } = useContext(CursoContext);
	//const token = localStorage.getItem('token');

	
	const [ loading, setLoading ] = useState(false);
	const [ snackbar, setSnackbar ] = useState({
		open: false,
		mensaje: '',
		status: ''
	});
	

	const handleClickOpen = (action, sucursal) => {
        
		if (action === 'edit') {
			setAction(true);
			setDatosSucursal({
				...datosSucursal,
				_id: sucursal._id,
				nombre_sucursal: sucursal.nombre_sucursal
			});
		setOpen(!open);
			return;
		}
		setAction(false);
        setOpen(!open);
	};

	

	const obtenerNombreSucursal= (e) => {
		if (action) {
			setDatosSucursal({
				...datosSucursal,
				[e.target.name]: e.target.value
			});
			return;
		}
		if (sucursales.length === 0) {
			setDatosSucursal({ ...datosSucursal, [e.target.name]: e.target.value, preference: 1 });
		} else {
			const preference = sucursales[sucursales.length - 1].block.preference + 1;
			setDatosSucursal({
				...datosSucursal,
				[e.target.name]: e.target.value,
				preference: preference
			});
		}
	};

	const messages = (estado, mensaje) => {
		if (estado === 'success') {
			setSnackbar({
				open: true,
				mensaje: mensaje,
				status: 'success'
			});
		} else {
			if (mensaje.response) {
				setSnackbar({
					open: true,
					mensaje: mensaje.response.data.message,
					status: 'error'
				});
			} else {
				setSnackbar({
					open: true,
					mensaje: 'Al parecer no se a podido conectar al servidor.',
					status: 'error'
				});
			}
		}
	};

	const guardarSucursalBD = async () => {
		/* if (!datosBloque.blockTitle) {
			return;
		}
		handleClickOpen();
		setLoading(true);
		if (action) {
			await clienteAxios
				.put(`/course/block/edit/${datosBloque._id}`, datosBloque, {
					headers: {
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					setLoading(false);
					messages('success', res.data.message);
					setUpdate(!update);
				})
				.catch((err) => {
					setLoading(false);
					messages('error', err);
				});
		} else {
			await clienteAxios
				.post(`/course/block/${datos._id}`, datosBloque, {
					headers: {
						Authorization: `bearer ${token}`
					}
				})
				.then((res) => {
					setLoading(false);
					messages('success', res.data.message);
					setUpdate(!update);
				})
				.catch((err) => {
					setLoading(false);
					messages('error', err);
				});
		} */
	};

	const eliminarSucursalBD = async (idSucursal) => {
		setLoading(false);
		/* await clienteAxios
			.delete(`/course/block/delete/${idBloque}`, {
				headers: {
					Authorization: `bearer ${token}`
				}
			})
			.then((res) => {
				setLoading(false);
				messages('success', res.data.message);
				setUpdate(!update);
			})
			.catch((err) => {
				setLoading(false);
				messages('error', err);
			}); */
	};

	const onDragEnd = (result) => {
		const { destination, source } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const new_elements = reorder(sucursales, source.index, destination.index);
		setSucursales(new_elements);
	};

	const renderBloques = sucursales.map((sucursal, index) => {
     
		return (
			<RenderSucursal
				key={sucursal._id}
				index={index}
				sucursal={sucursal}
				sucursales={sucursales}
				setSucursales={setSucursales}
				handleClickOpen={handleClickOpen}
			
				eliminarSucursalBD={eliminarSucursalBD}
			/>
		);
	});

	return (
		<Box>
			<Spin loading={loading} />
			<SnackBarMessages
				alert={snackbar.open}
				mensaje={snackbar.mensaje}
				status={snackbar.status}
				setSnackbar={setSnackbar}
			/>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable-blocks">
					{(provided) => (
						<Box my={2} ref={provided.innerRef}>
							{renderBloques}
							{provided.placeholder}
						</Box>
					)}
				</Droppable>
			</DragDropContext>
			
		</Box>
	);
}

function RenderSucursal({
	index,
	sucursal,
	sucursales,
	setSucursales,
	handleClickOpen,
	eliminarSucursalBD
}) {
 
	const classes = useStyles();
	const [ expanded, setExpanded ] = useState(false);
	const sucursalIn = sucursal;
	const [ deleteConfimation, setDeleteConfimation ] = useState({ open: false, id: '' });
	/* const [ temas, setTemas ] = useState(bloque.topics); */

	const handleDeleteConfimation = (idSucursal) => {
		setDeleteConfimation({ open: !deleteConfimation.open, id: idSucursal });
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Draggable draggableId={`sucursal-${sucursal._id}`} index={index}>
			{(provided) => (
				<Box
					borderRadius={5}
					my={2}
					ref={provided.innerRef}
					{...provided.draggableProps} /* {...provided.dragHandleProps} */
				>
					<AlertConfimationDelete
						deleteConfimation={deleteConfimation}
						handleDeleteConfimation={handleDeleteConfimation}
						eliminarSucursalBD={eliminarSucursalBD}
					/>
					<Card variant="outlined">
						<CardActions disableSpacing>
							<Grid container spacing={3}>
								<Hidden lgUp>
									<Grid item xs={12}>
										<Box display="flex" justifyContent="flex-end">
											<IconButton onClick={() => handleClickOpen('edit', sucursalIn)}>
												<EditOutlinedIcon />
											</IconButton>
											{/* {sucursal.topics.length === 0 ? (
												<IconButton onClick={() => handleDeleteConfimation(sucursalIn._id)}>
													<DeleteOutlinedIcon />
												</IconButton>
											) : null} */}
											<IconButton {...provided.dragHandleProps}>
												<DragIndicatorOutlinedIcon />
											</IconButton>
											<IconButton
												className={clsx(classes.expand, {
													[classes.expandOpen]: expanded
												})}
												onClick={() => handleExpandClick()}
												aria-expanded={expanded}
												aria-label="show more"
											>
												<ExpandMoreIcon />
											</IconButton>
										</Box>
									</Grid>
								</Hidden>
								<Grid item xs={10} sm={8}>
									<Typography variant="h5">{`Sucursal ${index + 1}: ${sucursal.nombre_sucursal}`}</Typography>
								</Grid>
								<Grid item xs={2} sm={4}>
									<Hidden mdDown>
										<Box display="flex" justifyContent="flex-end">
											<IconButton onClick={() => handleClickOpen('edit', sucursalIn)}>
												<EditOutlinedIcon />
											</IconButton>
											{/* {sucursal.topics.length === 0 ? (
												<IconButton onClick={() => handleDeleteConfimation(sucursal._id)}>
													<DeleteOutlinedIcon />
												</IconButton>
											) : null} */}
											<IconButton {...provided.dragHandleProps}>
												<DragIndicatorOutlinedIcon />
											</IconButton>
											<IconButton
												className={clsx(classes.expand, {
													[classes.expandOpen]: expanded
												})}
												onClick={() => handleExpandClick()}
												aria-expanded={expanded}
												aria-label="show more"
											>
												<ExpandMoreIcon />
											</IconButton>
										</Box>
									</Hidden>
								</Grid>
							</Grid>
						</CardActions>
						
					</Card>
				</Box>
			)}
		</Draggable>
	);
}

function AlertConfimationDelete({ deleteConfimation, handleDeleteConfimation, eliminarSucursalBD }) {
	return (
		<div>
			<Dialog
				open={deleteConfimation.open}
				onClose={handleDeleteConfimation}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'¿Estás seguro de eliminar este bloque?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleDeleteConfimation} color="primary">
						Cancelar
					</Button>
					<Button
						onClick={() => {
							handleDeleteConfimation();
							eliminarSucursalBD(deleteConfimation.id);
						}}
						color="secondary"
						autoFocus
					>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}