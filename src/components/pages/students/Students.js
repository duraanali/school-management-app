import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function Students({ id }) {
    const [students, setStudents] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/students')
            .then(res => {


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
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
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
                                <StyledTableCell align="left">ID</StyledTableCell>
                                <StyledTableCell align="left">NAME</StyledTableCell>
                                <StyledTableCell align="left">DOB</StyledTableCell>
                                <StyledTableCell align="left">CLASS</StyledTableCell>
                                <StyledTableCell align="left">PARENT</StyledTableCell>
                                <StyledTableCell align="left">ACTION</StyledTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => {

                                return <TableRow>

                                    <TableCell key={student.id} align="left">{student.id}</TableCell>
                                    <TableCell key={student.id} align="left">{student.name}</TableCell>
                                    <TableCell key={student.id} align="left">{student.dob}</TableCell>
                                    <TableCell key={student.id} align="left">{student.class_id}</TableCell>
                                    <TableCell key={student.id} align="left">{student.parent_id}</TableCell>
                                    <TableCell key={student.id} align="left"><Link to={`/studentedit/${student.id}`}> Edit </Link></TableCell>

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



