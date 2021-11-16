import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const CustomerDialog = (props) => {
    return (
        <Dialog
            fullWidth={true}
            maxWidth='lg'
            open={props.open}
            onClose={props.close}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ? '' : 'Update'}</DialogTitle>
            <ValidatorForm
                onSubmit={props.addCustomer}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Primeiro Nome"
                                onChange={props.changeFirstname}
                                name="firstname"
                                value={props.firstname}
                                validators={['required']}
                                errorMessages={['Campo Obrigatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Ultimo Nome"
                                onChange={props.changeLastname}
                                name="lastname"
                                value={props.lastname}
                                validators={['required']}
                                errorMessages={['Campo Obrigatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Telefone ou Celular"
                                onChange={props.changephonenumber}
                                name="phonenumber"
                                value={props.phonenumber}
                                validators={['required']}
                                errorMessages={['Campo Obrigatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Email"
                                onChange={props.changeEmail}
                                name="postcode"
                                value={props.email}
                                validators={['required']}
                                errorMessages={['Campo Obrigatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="secondary">
                        {props.formmode ? 'Adicionar' : 'Update'}
                    </Button>
                    <Button onClick={props.close} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default CustomerDialog;