import React from 'react';
import {
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    InputLabel,
    FormControl,
    SelectChangeEvent
} from '@mui/material';

interface SearchProps {
    breeds: string[];
    selectedBreeds: string[];
    onSelectChange: (selected: string[]) => void;
}

const Search: React.FC<SearchProps> = ({ breeds, selectedBreeds, onSelectChange }) => {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedBreeds = event.target.value as string[];
        console.log('Selected breeds:', selectedBreeds);
        onSelectChange(selectedBreeds);
    };


    return (
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
    );
};

export default Search;