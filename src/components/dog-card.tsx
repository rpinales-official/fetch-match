import React, { JSX } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from '@mui/material';

interface DogCardProps {
    img: string;
    name: string;
    age: number;
    breed: string;
    zipCode: string;
    onAddRemove: () => void;
    isSelected: boolean;
}

function DogCard(props: DogCardProps): JSX.Element {
    const {
        img,
        name,
        age,
        breed,
        zipCode,
        onAddRemove,
        isSelected,
    } = props;

    return (
        <Card sx={styles.card}>
            <CardMedia
                component="img"
                sx={styles.cardMedia}
                image={img}
                alt={name}
            />
            <CardContent sx={styles.cardContent}>
                <Typography variant="h6" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="body2">Age: {age}</Typography>
                <Typography variant="body2">Breed: {breed}</Typography>
                <Typography variant="body2">Zip Code: {zipCode}</Typography>
                <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    onClick={onAddRemove}>
                    {isSelected ? 'Remove from favorites' : 'Add from favorites'}
                </Button>
            </CardContent>
        </Card>
    );
};

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 500,
        p: 2,
        mb: 2
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        ml: 2,
    },
    cardMedia: {
        width: 120,
        height: 120,
        borderRadius: 2,
        objectFit: 'cover',
    },
};

export default DogCard;