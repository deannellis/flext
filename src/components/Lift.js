import React from 'react';
import { useParams } from "react-router-dom";

const Lift = () => {
    let { id } = useParams();
    return (
        <h1>{`that boi, ${id}`}</h1>
    );
}
 
export default Lift;