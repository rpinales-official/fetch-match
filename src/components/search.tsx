import React, { useState } from 'react';
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
} from '@mui/material';

interface SearchProps {
    breeds: string[];
    selectedBreeds: string[];
    onSelectChange: (selected: string[]) => void;
}

const Search: React.FC<SearchProps> = ({ breeds, selectedBreeds, onSelectChange }) => {
    const [zipcode, setZipcode] = useState<string>('');

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedBreeds = event.target.value as string[];
        console.log('Selected breeds:', selectedBreeds);
        onSelectChange(selectedBreeds);
    };

    return (
        <Box sx={styles.container}>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Select Dog Breeds</InputLabel>
                <Select
                    multiple
                    value={selectedBreeds}
                    onChange={handleChange}
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
            <Box sx={styles.zipcodeWraper}>
                <TextField
                    label="Enter Zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
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
    zipcodeWraper: {
        display: 'flex',
        gap: 2,
    },
};

export default Search;