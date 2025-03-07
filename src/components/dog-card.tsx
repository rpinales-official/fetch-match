import React, { JSX } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from '@mui/material';

interface DogCardProps {
    img: string;
    name: string;
    age: number;
    breed: string;
    zipCode: string;
}

function DogCard(props: DogCardProps): JSX.Element {
    const {
        img,
        name,
        age,
        breed,
        zipCode
    } = props;

    return (
        <Card sx={styles.card}>
            <CardMedia
                component="img"
                sx={{ width: 120, height: 120, borderRadius: 2, objectFit: 'cover' }}
                image={img}
                alt={name}
            />
            <CardContent sx={styles.CardContent}>
                <Typography variant="h6" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="body2">Age: {age}</Typography>
                <Typography variant="body2">Breed: {breed}</Typography>
                <Typography variant="body2">Zip Code: {zipCode}</Typography>
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
    CardContent: {
        display: 'flex',
        flexDirection: 'column',
        ml: 2,
    }
};

export default DogCard;