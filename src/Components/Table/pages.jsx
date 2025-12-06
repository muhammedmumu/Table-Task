import * as React from 'react';
import { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Pages from '../AutoComplete/Pages';
import Box from '@mui/material/Box';
export default function BasicTable() {
    // Get data and filters from context
    const {
        data,
        loading,
        error,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
    } = useContext(DataContext);

    // Local state for table-specific functionality
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Event handlers
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleFilters = () => {
        setFiltersOpen(!filtersOpen);
    };

    const handleRoleFilterChange = (event) => {
        setRoleFilter(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    // Derived values
    const uniqueRoles = [...new Set(data.map(item => item.role))];
    const uniqueStatuses = [...new Set(data.map(item => item.status))];

    // Filtering logic
    const filteredData = data.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === '' || item.role === roleFilter;
        const matchesStatus = statusFilter === '' || item.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const paginatedData = filteredData.slice(
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

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div>Loading...</div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div>Error: {error}</div>
            </Container>
        );
    }

    return (
        <Container
            width="100%"
            sx={{
                bgcolor: '#f5f5f5',
                margin: 'auto',
                py: 2,
                px: 2,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
            }}
        >
            <Box sx={{
                mb: 3,
                width: '100%'
            }}
            ><Pages /></Box>

            <TableContainer
                component={Paper}
                sx={{
                    flex: 1,
                    maxHeight: 'calc(100vh - 300px)',
                    overflow: 'auto',
                    boxShadow: 3,
                    borderRadius: 2,
                    width: '100%',

                }}
            >
                <Table
                    sx={{
                        minWidth: 650,
                        '& .MuiTableHead-root': {
                            position: 'sticky',
                            top: 0,
                            zIndex: 1
                        }
                    }}
                    aria-label="simple table"
                    stickyHeader
                >
                    <TableHead
                        sx={{
                            bgcolor: '#f5f5f5',
                            '& .MuiTableCell-head': {
                                backgroundColor: '#f5f5f5',
                                fontWeight: 600,
                                borderBottom: '2px solid #e0e0e0'
                            }
                        }}
                    >
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
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>

        </Container >
    )
}
