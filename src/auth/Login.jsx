import React, { useState, useEffect } from 'react';
import {
    Container, CssBaseline, Typography, FormControlLabel, Button, Checkbox, Grid, Link, makeStyles, Card, CardContent
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import fire from '../helpers/fbConfig';
import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import Logo from '../asserts/ban-i2.png';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        background: '#9999ff',
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

const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberme, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const Update = () => {
        fire.ref().update({
            led: "ON",
        }).catch(alert);
    }

    const override = `
        display: flex;
        margin-left: 150px;
        border-color: #9999ff;
    `;

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleCheck = (event) => {
        setRememberMe(event.target.checked);
    }
    const handlerLogin = () => {
        setLoading(true);
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const { user } = response;
                const data = {
                    userId: user.uid,
                    email: user.email
                }
                localStorage.setItem('user', JSON.stringify(data));
                const storage = localStorage.getItem('user');
                const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                props.loggedIn(loggedInUser);
                setLoading(false);
            }).catch(error => {
                toast.error(error.message);
                setLoading(false);
            });
        fire.ref().update({
            Led: "ON",
        }).catch(alert);
    }
    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CardContent>
                    <ToastContainer />
                    <CssBaseline />
                    <div className={classes.paper}>
                        <img src={Logo} />
                        <br />
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <ValidatorForm
                            onSubmit={handlerLogin}
                            onError={errors => {
                                for (const err of errors) {
                                    console.log(err.props.errorMessages[0])
                                }
                            }}
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
                                autoComplete='off' />
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
                            <FormControlLabel
                                control={<Checkbox value={rememberme} onChange={(e) => handleCheck(e)} color="primary" />}
                                label="Lembrar-me"
                            />
                            <br />
                            {loading ? (
                                <ScaleLoader
                                    css={override}
                                    size={150}
                                    color={"#9999ff"}
                                    loading={loading} />
                            ) : (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    Entrar
                                </Button>
                            )}

                        </ValidatorForm>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}


export default Login;