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
import { Link } from 'react-router-dom';

function Students() {
    const [students, setStudents] = useState([])


    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/students/')
            .then(res => {
                console.log('Inside axios', res.data)

                setStudents(res.data)

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
        header: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
            marginLeft: 100,
            display: 'flex'
        },
        table: {
            minWidth: 240,
        },
        title: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
            marginLeft: 100
        },
        add: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
            marginLeft: 500
        }
    }));

    const classes = useStyles();

    return (

        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <div className={classes.header}>
                    <h2 className={classes.title}>Students</h2>
                    <h2 className={classes.add}>
                        <Link to="/studentadd">Add Student</Link>
                    </h2>
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">NAME</TableCell>
                                <TableCell align="left">DOB</TableCell>
                                <TableCell align="left">PARENT</TableCell>
                                <TableCell align="left">CLASS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => {

                                return <TableRow key={student.name}>

                                    <TableCell align="left">{student.id}</TableCell>
                                    <TableCell align="left">{student.name}</TableCell>
                                    <TableCell align="left">{student.dob}</TableCell>
                                    <TableCell align="left">{student.parent_id}</TableCell>
                                    <TableCell align="left">{student.class_id}</TableCell>
                                </TableRow>

                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </React.Fragment>
    );

}

export default Students;



