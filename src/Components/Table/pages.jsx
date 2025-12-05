import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';



export default function BasicTable() {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const paginatedData = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // change page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // change rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // reset to first page
    };

    useEffect(() => {
        fetch('http://localhost:3000/Details').then(responce => {
            return responce.json()
        }).then((item) => setData(item)).catch(err => setError(err.message))
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'warning';
            case 'pending':
                return 'error';
            default:
                return 'primary';
        }
    };







    return (
        <Container sx={{ bgcolor: '#f5f5f5', margin: 'auto' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Join Data</TableCell>
                            <TableCell>Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((item) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell >{item.name}</TableCell>
                                    <TableCell >{item.email}</TableCell>
                                    <TableCell >{item.role}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.status}
                                            color={getStatusColor(item.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell >{item.joindate}</TableCell>
                                    <TableCell >{item.salary}</TableCell>
                                </TableRow>)
                        }
                        )}
                    </TableBody>

                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>

        </Container >
    )
}
