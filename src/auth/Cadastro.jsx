import React, {useEffect, useState} from 'react';
import {Container, CssBaseline, Typography, Button, Grid, Link, makeStyles, Card, CardContent} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import fire from '../helpers/fbConfig';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../asserts/icon.png';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
          background: 'linear-gradient(45deg, white 10%, 30%, orange 90%)',
          margin: theme.spacing(3, 0, 2),
          color: '#fff'
      },
      card: {
          marginTop: '60px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
      },
      pointer: {
          cursor: 'pointer',
          color: 'red'
      }
}));

const SignUp = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPassowerd = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handleSignUp = () => {
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                if(response) {
                    props.toggle();
                    toast.success('Usuario Cadastrado com Sucesso!!');
                }
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error(error.message);
                        break;
                    case 'auth/invalid-email': 
                        toast.error(error.message);                    
                        break;
                    case 'auth/weak-password':
                        toast.error(error.message);
                        break;
                }
            });
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if(value !== password) {
                return false;
            }
            return true;
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }
    }, [password])
    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CardContent>
                    <ToastContainer/>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <img src={Logo} />
                        <Typography component="h1" variant="h5">
                            Cadastro
                        </Typography>
                        <ValidatorForm 
                         onSubmit={handleSignUp}
                         className={classes.form}>
                        <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Email"
                                onChange={handleEmail}
                                name="email"
                                value={email}
                                validators={['required', 'isEmail']}
                                errorMessages={['Campo Obrigatorio', 'Email Invalido']}
                                autoComplete='off'
                            />
                            <br/>
                            <TextValidator
                                variant="outlined"
                                fullWidth
                                label="Password"
                                onChange={handlePassword}
                                name="password"
                                type="password"
                                value={password}
                                validators={['required']}
                                errorMessages={['Campo Obrigatorio']}
                                autoComplete="off"
                            />
                            <br/>
                            <TextValidator
                                variant="outlined"
                                label="Confirm password"
                                fullWidth
                                onChange={handleConfirmPassowerd}
                                name="confirmPassword"
                                type="password"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['Senha incorreta', 'Campo Obrigatorio']}
                                value={confirmPassword}
                                autoComplete="off"
                            />
                             <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Cadastrar
                            </Button>
                            <Grid container>
                                <Grid item>
                                <Link onClick={props.toggle} className={classes.pointer} variant="body2">
                                    {"Ja possui conta? Faça o login"}
                                </Link>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}


export default SignUp;