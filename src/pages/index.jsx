import React, { useState } from 'react';
import {
    Container, CssBaseline, TextField, makeStyles, Card, CardContent, Button
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../asserts/ban-i2.png';

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
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Card className={classes.card}>
                    <CardContent>
                        <ToastContainer />
                        <CssBaseline />
                        <div className={classes.paper}>
                            <TextField
                                label="Digite a senha"
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                className={classes.submit}
                            >
                                Entrar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <br /><br />
                <Card className={classes.card}>
                    <CardContent>
                        <ToastContainer />
                        <CssBaseline />
                        <div className={classes.paper}>
                            <img src={Logo} />
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}