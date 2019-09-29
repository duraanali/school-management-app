import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

function Dashboard() {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
            marginLeft: 100
        },
        table: {
            minWidth: 240,
        }
    }));

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Paper className={classes.root}>
                    <h1>Welcome To Alif Cloud</h1>
                </Paper>
            </Container>
        </React.Fragment>
    );

}

export default Dashboard;
