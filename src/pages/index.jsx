import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import {getCustomers, addCustomer, getCustomer, updateCustomer, deleteCustomer} from '../component/index';
import CustomerDialog from '../component/indexDialog';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: '40px'
    }, 
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
}));


const Customer = () => {
    const classes  = useStyles();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] =  useState('');
    const [email, setEmail] = useState('');
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: orange;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getCustomers();
            setCustomers(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneCustomer = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getCustomer(id);
                 setFirstName(response.firstname);
                 setLastName(response.lastname);
                 setPhoneNumber(response.phonenumber);
                 setEmail(response.email);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteCustomer(id);
                getlist();
                toast.success('Usuario deletado com sucesso');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setEmail(''); 
    }

    const addCustomerHandler = async () => {
            try {
                 const customer = {
                     firstname,
                     lastname,
                     phonenumber,
                     email,
                 }
                if (formMode) {
                    await addCustomer(customer);
                    toast.success('Usuario Adicionado com Sucesso');
                    getlist();
                    setOpen(false);
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setEmail('');
                }else {
                    await updateCustomer(custId, customer);
                    toast.success('Usuario Atualizado Sucesso');
                    getlist();
                    setOpen(false);
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setEmail(''); 
                }
            } catch (error) {
                toast.error(error.message);
            }
    }

    useEffect(() => {
        getlist();
    }, []);
    return (
        <Container className={classes.container}>
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography className={classes.title} variant="h6" component="div">
                        Agenda
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    />
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Nome</TableCell>
                            <TableCell className={classes.head}>Telefone</TableCell>
                            <TableCell className={classes.head}>Email</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <ScaleLoader 
                                     css={override}
                                    size={150}
                                    color={"#eb4034"}
                                    loading={loading}/>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {customers.map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell>{cust.firstname} {cust.lastname}</TableCell>
                                  <TableCell>{cust.phonenumber}</TableCell>
                                  <TableCell>{cust.email}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneCustomer(cust.id)} color="primary" aria-label="update customer">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete customer">
                                        <Delete />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                            ))}
                              
                            </>
                        )}
                        
                    </TableBody>
                </Table>  
            </TableContainer>
            <CustomerDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                firstname={firstname}
                lastname={lastname}
                phonenumber={phonenumber}
                email={email}
                changeFirstname={handleFirstName}
                changeLastname={handleLastName}
                changephonenumber={handlePhoneNumber}
                changeEmail={handleEmail}
                addCustomer={addCustomerHandler}
            />
        </Container>
    );
}


export default Customer;