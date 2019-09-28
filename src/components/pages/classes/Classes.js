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

function Classes() {
    const [classes, setClasses] = useState([])
    console.log('Initial state', classes)

    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/classes/')
            .then(res => {
                console.log('Inside axios', res.data)

                setClasses(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);

    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
    }));

    const classes1 = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Paper className={classes1.root}>
                    <Table className={classes1.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">NAME</TableCell>
                                <TableCell align="left">SUBJECT</TableCell>
                                <TableCell align="left">CREATED</TableCell>
                                <TableCell align="left">TEACHER</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classes.map((item) => {

                                return <TableRow key={item.name}>

                                    <TableCell align="left">{item.id}</TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                    <TableCell align="left">{item.subject}</TableCell>
                                    <TableCell align="left">{item.created}</TableCell>
                                    <TableCell align="left">{item.teacher_id}</TableCell>
                                </TableRow>

                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </React.Fragment>
    );

}

export default Classes;
