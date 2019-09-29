import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Admins() {
    const [admins, setAdmins] = useState([])


    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/admins/all')
            .then(res => {
                console.log('Inside axios', res.data)

                setAdmins(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);

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
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">NAME</TableCell>
                                <TableCell align="left">EMAIL</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admins.map((admin) => {

                                return <TableRow key={admin.name}>

                                    <TableCell align="left">{admin.id}</TableCell>
                                    <TableCell align="left">{admin.name}</TableCell>
                                    <TableCell align="left">{admin.email}</TableCell>

                                </TableRow>

                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </React.Fragment>
    );

}

export default Admins;
