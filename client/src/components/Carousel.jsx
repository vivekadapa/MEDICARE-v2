import React from 'react';
import { Paper, Button, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import hero1 from "../assets/hero_5.jpg";
import hero2 from "../assets/hero_2.jpg";
import hero3 from "../assets/hero_1.jpg";
import hero4 from "../assets/hero_4.jpg";

const items = [
    {
        name: "Item 1",
        description: "Description for Item 1",
        src: hero1
    },
    // {
    //     name: "Item 2",
    //     description: "Description for Item 2",
    //     src: hero2
    // },
    {
        name: "Item 3",
        description: "Description for Item 3",
        src: hero3
    },
    {
        name: "Item 4",
        description: "Description for Item 4",
        src: hero4
    }
];

const CarouselComponent = () => {
    return (
        <Carousel animation='slide' duration={500}>
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </Carousel>
    );
};

const Item = ({ item }) => {
    return (
        <Paper className='w-full h-full rounded-md shadow-xl'>
            <img src={item.src} className='w-full h-full shadow-xl rounded-md' alt="" />
        </Paper>
    );
};

export default CarouselComponent;
