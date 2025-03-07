import React, { JSX } from 'react';
import {
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    InputLabel,
    FormControl,
    SelectChangeEvent,
    Box,
    TextField,
    Button,
} from '@mui/material';

interface SearchProps {
    breeds: string[];
    selectedBreeds: string[];
    onSelectChange: (selected: string[]) => void;
    zipCode: string;
    onZipcodeChange: (zipcode: string) => void;
    onSearch: () => void;
}

function Search(props: SearchProps): JSX.Element {
    const {
        breeds,
        selectedBreeds,
        onSelectChange,
        zipCode,
        onZipcodeChange,
        onSearch,
    } = props;

    const handleBreedChange = (event: SelectChangeEvent<string[]>) => {
        const selectedBreeds = event.target.value as string[];
        onSelectChange(selectedBreeds);
    };

    const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newZipcode = event.target.value;
        onZipcodeChange(newZipcode);
    };

    return (
        <Box sx={styles.container}>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Select Dog Breeds</InputLabel>
                <Select
                    multiple
                    value={selectedBreeds}
                    onChange={handleBreedChange}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    label="Select Dog Breeds">
                    {breeds.map((breed) => (
                        <MenuItem key={breed} value={breed}>
                            <Checkbox checked={selectedBreeds.indexOf(breed) > -1} />
                            <ListItemText primary={breed} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={styles.zipcodeWrapper}>
                <TextField
                    label="Enter Zipcode"
                    value={zipCode}
                    onChange={handleZipcodeChange}
                    variant="outlined"
                    fullWidth
                />
            </Box>
            <Box sx={styles.searchButtonWrapper}>
                <Button variant="contained" onClick={onSearch}>Search</Button>
            </Box>
        </Box>

    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    zipcodeWrapper: {
        display: 'flex',
        gap: 2,
    },
    searchButtonWrapper: {
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'center',
    },
};

export default Search;