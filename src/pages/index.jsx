import React, { useState } from 'react';
import {
    Container, CssBaseline, TextField, makeStyles, Card, CardContent, Button
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Logo from '../asserts/ban-i2.png';
import fire from '../helpers/fbConfig';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        background: '#9999ff',
        margin: theme.spacing(3, 0, 2),
        color: '#fff'
    }

}));

export default function Portaria() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');


    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handlerLogin = () => {

        console.log("Senha", password);

        if (password === 1111) {
            fire.ref().update({
                PASSWORD: "TRUE",
            }).catch(alert);
            setLoading(true);
            setPassword('');
        }

    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Card className={classes.card}>
                    <CardContent>
                        <ToastContainer />
                        <CssBaseline />
                        <div className={classes.paper}>
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
                                    label="Digite Sua senha"
                                    onChange={handlePassword}
                                    name="password"
                                    type="password"
                                    value={password}
                                    validators={['required']}
                                    errorMessages={['Campo Obrigatorio']}
                                    autoComplete="off"
                                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                    margin="normal"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    className={classes.submit}
                                >
                                    Entrar
                                </Button>
                            </ValidatorForm>
                        </div>
                    </CardContent>
                </Card>
                <br /><br />
            </Container>
        </>
    );
}