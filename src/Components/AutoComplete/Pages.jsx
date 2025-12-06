import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Pages() {
    const {
        data,
        loading,
        error,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
    } = useContext(DataContext);

    const [filtersOpen, setFiltersOpen] = React.useState(false);

    const toggleFilters = () => {
        setFiltersOpen(!filtersOpen);
    };

    const handleRoleFilterChange = (event) => {
        setRoleFilter(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const clearFilters = () => {
        setRoleFilter('');
        setStatusFilter('');
    };

    const uniqueRoles = [...new Set(data.map((item) => item.role))];
    const uniqueStatuses = [...new Set(data.map((item) => item.status))];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container spacing={3} alignItems="center" justifyContent="space-around">
                    <Grid container spacing={3} xs={12} sm={6} >
                        <Grid item>
                            <Autocomplete
                                disablePortal
                                options={data.map((item) => item.name)}
                                sx={{ width: 200 }}
                                renderInput={(params) => <TextField {...params} label="Label" />}
                            />
                        </Grid>
                        <Grid item>
                            <Box>
                                <IconButton onClick={toggleFilters}>
                                    <FilterListIcon sx={{ width: 100 }} />
                                    {filtersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>
                            <Collapse in={filtersOpen}>
                                <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <FormControl fullWidth sx={{ width: 200 }}>
                                                <InputLabel>Filter by Role</InputLabel>
                                                <Select
                                                    value={roleFilter}
                                                    onChange={handleRoleFilterChange}
                                                    label="Filter by Role"
                                                    sx={{ borderRadius: 2 }}
                                                >
                                                    <MenuItem value="">All Roles</MenuItem>
                                                    {uniqueRoles.map((role) => (
                                                        <MenuItem key={role} value={role}>
                                                            {role}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <FormControl fullWidth sx={{ width: 200 }}>
                                                <InputLabel>Filter by Status</InputLabel>
                                                <Select
                                                    value={statusFilter}
                                                    onChange={handleStatusFilterChange}
                                                    label="Filter by Status"
                                                    sx={{ borderRadius: 2 }}
                                                >
                                                    <MenuItem value="">All Statuses</MenuItem>
                                                    {uniqueStatuses.map((status) => (
                                                        <MenuItem key={status} value={status}>
                                                            {status}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Collapse>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ mt: 3 }} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                sx={{
                                    mr: 2,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: 2
                                }}
                            >
                                Download
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ borderRadius: 2 }}
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Pages;