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

function Teachers() {
    const [teachers, setTeachers] = useState([])


    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/teachers/all')
            .then(res => {
                console.log('Inside axios', res.data)

                setTeachers(res.data)

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
                    <h2 className={classes.title}>Teachers</h2>
                    <h2 className={classes.add}>
                        <Link to="/teacheradd">Add New Teacher</Link>
                    </h2>
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">ID</StyledTableCell>
                                <StyledTableCell align="left">NAME</StyledTableCell>
                                <StyledTableCell align="left">EMAIL</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teachers.map((teacher) => {

                                return <TableRow key={teacher.name}>

                                    <TableCell align="left">{teacher.id}</TableCell>
                                    <TableCell align="left">{teacher.name}</TableCell>
                                    <TableCell align="left">{teacher.email}</TableCell>

                                </TableRow>

                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </React.Fragment>
    );

}

export default Teachers;



