import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, makeStyles} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menubackgroud: {
        background: '#9999ff',
    }, 
    title: {
        flexGrow: 1,
        color: 'white'
    }
}));

const NavBar = (props) => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        localStorage.removeItem('user');
        props.setUserState();
        setAnchorEl(null);
    }


    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.menubackgroud}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Portaria Remota
                    </Typography>
                    {auth && (
                    <div>
                        <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        >
                        <AccountCircle />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleCloseMenu}
                        >
                        <MenuItem onClick={handleClose}>Sair</MenuItem>
                        </Menu>
                    </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}



export default NavBar;