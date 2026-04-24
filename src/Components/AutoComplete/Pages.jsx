import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';

const cardStatStyles = {
    flex: 1,
    minWidth: { xs: '100%', sm: 160 },
    p: 2,
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'rgba(255,255,255,0.68)',
    backdropFilter: 'blur(10px)',
};

function Pages({ filteredData, totalCount, onExport }) {
    const {
        data,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        searchTerm,
        setSearchTerm,
        notice,
    } = useContext(DataContext);

    const [filtersOpen, setFiltersOpen] = React.useState(false);

    const uniqueRoles = [...new Set(data.map((item) => item.role))].sort();
    const uniqueStatuses = [...new Set(data.map((item) => item.status))].sort();
    const activeCount = data.filter((item) => item.status === 'active').length;
    const pendingCount = data.filter((item) => item.status === 'pending').length;
    const hasFilters = Boolean(searchTerm || roleFilter || statusFilter);

    const clearFilters = () => {
        setSearchTerm('');
        setRoleFilter('');
        setStatusFilter('');
    };

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 5,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                background: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #fff8ef 0%, #ffffff 45%, #f1f7ff 100%)'
                        : 'linear-gradient(135deg, #1a2234 0%, #121826 45%, #142033 100%)',
                boxShadow: '0 24px 60px rgba(15, 23, 42, 0.12)',
            }}
        >
            <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Stack spacing={3}>
                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        spacing={3}
                        justifyContent="space-between"
                    >
                        <Box sx={{ maxWidth: 700 }}>
                            <Chip
                                label="Project Showcase"
                                sx={{
                                    mb: 2,
                                    fontWeight: 700,
                                    color: '#8a4b14',
                                    backgroundColor: 'rgba(255, 214, 153, 0.45)',
                                }}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    fontWeight: 800,
                                    lineHeight: 1.05,
                                    letterSpacing: '-0.04em',
                                }}
                            >
                                Team directory with a cleaner, showcase-ready experience.
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mt: 1.5, maxWidth: 620 }}
                            >
                                Search people instantly, narrow the list with smart filters, and export
                                the current view. The layout is designed to feel presentable for demos
                                while staying practical for day-to-day use.
                            </Typography>
                        </Box>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            sx={{ minWidth: { lg: 360 } }}
                        >
                            <Box sx={cardStatStyles}>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <GroupsRoundedIcon color="primary" />
                                    <Box>
                                        <Typography variant="overline" color="text.secondary">
                                            Total Members
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                            {totalCount}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box sx={cardStatStyles}>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <CheckCircleRoundedIcon sx={{ color: '#15803d' }} />
                                    <Box>
                                        <Typography variant="overline" color="text.secondary">
                                            Active
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                            {activeCount}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box sx={cardStatStyles}>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <PendingActionsRoundedIcon sx={{ color: '#b45309' }} />
                                    <Box>
                                        <Typography variant="overline" color="text.secondary">
                                            Pending
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                            {pendingCount}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    {notice ? <Alert severity="info">{notice}</Alert> : null}

                    <Stack
                        direction={{ xs: 'column', xl: 'row' }}
                        spacing={2}
                        alignItems={{ xs: 'stretch', xl: 'center' }}
                        justifyContent="space-between"
                    >
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flex={1}>
                            <Autocomplete
                                freeSolo
                                options={data.map((item) => item.name)}
                                value={searchTerm}
                                onInputChange={(_, value) => setSearchTerm(value)}
                                sx={{ minWidth: { xs: '100%', md: 320 }, flex: 1 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search by name or email"
                                        placeholder="Start typing to filter the directory"
                                    />
                                )}
                            />
                            <Button
                                variant={filtersOpen ? 'contained' : 'outlined'}
                                startIcon={<FilterListRoundedIcon />}
                                onClick={() => setFiltersOpen((open) => !open)}
                                sx={{
                                    minWidth: { xs: '100%', md: 180 },
                                    borderRadius: 3,
                                    px: 2.5,
                                }}
                            >
                                {filtersOpen ? 'Hide Filters' : 'Show Filters'}
                            </Button>
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                            <Button
                                variant="contained"
                                startIcon={<DownloadRoundedIcon />}
                                onClick={onExport}
                                sx={{
                                    borderRadius: 3,
                                    px: 2.5,
                                    background: 'linear-gradient(135deg, #0f766e 0%, #0f4c81 100%)',
                                }}
                            >
                                Export Current View
                            </Button>
                            <Button
                                variant="text"
                                startIcon={<RestartAltRoundedIcon />}
                                onClick={clearFilters}
                                disabled={!hasFilters}
                                sx={{ borderRadius: 3, px: 2.5 }}
                            >
                                Reset
                            </Button>
                        </Stack>
                    </Stack>

                    <Collapse in={filtersOpen}>
                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: 4,
                                border: '1px solid',
                                borderColor: 'divider',
                                backgroundColor: 'background.paper',
                            }}
                        >
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                spacing={2}
                                divider={<Divider flexItem orientation="vertical" />}
                            >
                                <FormControl fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        value={roleFilter}
                                        onChange={(event) => setRoleFilter(event.target.value)}
                                        label="Role"
                                    >
                                        <MenuItem value="">All roles</MenuItem>
                                        {uniqueRoles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={statusFilter}
                                        onChange={(event) => setStatusFilter(event.target.value)}
                                        label="Status"
                                    >
                                        <MenuItem value="">All statuses</MenuItem>
                                        {uniqueStatuses.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Box>
                    </Collapse>

                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={1}
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        justifyContent="space-between"
                    >
                        <Typography variant="body2" color="text.secondary">
                            Showing <strong>{filteredData.length}</strong> of <strong>{totalCount}</strong>{' '}
                            team members
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {searchTerm ? <Chip size="small" label={`Search: ${searchTerm}`} /> : null}
                            {roleFilter ? <Chip size="small" label={`Role: ${roleFilter}`} /> : null}
                            {statusFilter ? <Chip size="small" label={`Status: ${statusFilter}`} /> : null}
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default Pages;
