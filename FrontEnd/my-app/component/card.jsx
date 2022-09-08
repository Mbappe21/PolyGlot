import React from 'react';

const Card = (props) => {
    return (
        <div className="flex flex-col gap-1 w-1/3 py-1 px-3">
            <h3 className="text-lg font-medium">{props.data.name}</h3>

            <p className="font-light">{props.data.min_desc}</p>
            <div className="flex gap-2">
                <span>{props.data.langugue}</span>
                <span>{props.data.date}</span>
            </div>
        </div>
    );
}

export default Card;
