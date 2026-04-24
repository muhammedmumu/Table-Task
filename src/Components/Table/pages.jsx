import * as React from 'react';
import { useContext, useMemo, useState } from 'react';
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
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function BasicTable() {
    const {
        data,
        loading,
        error,
        roleFilter,
        statusFilter,
        searchTerm,
    } = useContext(DataContext);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredData = useMemo(
        () =>
            data.filter((item) => {
                const query = searchTerm.trim().toLowerCase();
                const matchesSearch =
                    query === '' ||
                    item.name.toLowerCase().includes(query) ||
                    item.email.toLowerCase().includes(query);

                const matchesRole = roleFilter === '' || item.role === roleFilter;
                const matchesStatus = statusFilter === '' || item.status === statusFilter;

                return matchesSearch && matchesRole && matchesStatus;
            }),
        [data, roleFilter, searchTerm, statusFilter]
    );

    const paginatedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    React.useEffect(() => {
        setPage(0);
    }, [roleFilter, statusFilter, searchTerm]);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleExport = () => {
        const headers = ['Name', 'Email', 'Role', 'Status', 'Join Date', 'Salary'];
        const rows = filteredData.map((item) => [
            item.name,
            item.email,
            item.role,
            item.status,
            item.joindate,
            item.salary,
        ]);

        const csvContent = [headers, ...rows]
            .map((row) =>
                row
                    .map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`)
                    .join(',')
            )
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', 'team-directory.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'default';
            case 'pending':
                return 'warning';
            default:
                return 'primary';
        }
    };

    if (loading && data.length === 0) {
        return (
            <Container
                maxWidth="xl"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
            >
                <Typography variant="h6">Loading directory...</Typography>
            </Container>
        );
    }

    if (error && data.length === 0) {
        return (
            <Container
                maxWidth="xl"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
            >
                <Typography variant="h6">Error: {error}</Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth={false}
            sx={{
                py: { xs: 2, md: 4 },
                px: { xs: 1, md: 3 },
                minHeight: '100vh',
            }}
        >
            <Stack spacing={3}>
                <Pages
                    filteredData={filteredData}
                    totalCount={data.length}
                    onExport={handleExport}
                />

                <TableContainer
                    component={Paper}
                    sx={{
                        overflow: 'hidden',
                        borderRadius: 5,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
                        backgroundImage: 'none',
                    }}
                >
                    <Box
                        sx={{
                            px: { xs: 2, md: 3 },
                            py: 2.5,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            background: (theme) =>
                                theme.palette.mode === 'light'
                                    ? 'linear-gradient(180deg, rgba(247, 250, 252, 1) 0%, rgba(255,255,255,1) 100%)'
                                    : 'linear-gradient(180deg, rgba(18, 24, 38, 1) 0%, rgba(30,30,30,1) 100%)',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
                            Directory Overview
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Browse the filtered team list with sticky headers and quick status visibility.
                        </Typography>
                    </Box>

                    <Table
                        sx={{
                            minWidth: 840,
                            '& .MuiTableCell-root': {
                                borderColor: 'rgba(148, 163, 184, 0.18)',
                            },
                        }}
                        aria-label="team directory table"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, py: 2 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, py: 2 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 700, py: 2 }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 700, py: 2 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, py: 2 }}>Join Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, py: 2 }}>Salary</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <TableRow
                                        key={`${item.email}-${index}`}
                                        hover
                                        sx={{
                                            '&:last-child td, &:last-child th': { borderBottom: 0 },
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                        }}
                                    >
                                        <TableCell sx={{ py: 2 }}>
                                            <Stack spacing={0.3}>
                                                <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Team Member
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>{item.email}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{item.role}</TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            <Chip
                                                label={item.status}
                                                color={getStatusColor(item.status)}
                                                size="small"
                                                sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>{item.joindate}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{item.salary}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ py: 8 }}>
                                        <Stack spacing={1} alignItems="center">
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                No team members match these filters
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Try changing the search text or clearing one of the active filters.
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Stack>
        </Container>
    );
}
