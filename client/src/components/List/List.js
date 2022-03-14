import {useEffect, useRef, useState} from "react";

const List = ({parentCallback, routes}) => {
    const [route, setRoute] = useState('work-home');

    const handleChange = (name) => {
        setRoute(name);
        parentCallback(name);
    };

    const listItems = routes.map((r) =>
        <li className={r === route ? 'active cursor-pointer text-blue-600 text-sm' : 'cursor-pointer text-sm'} key={r.toString()}
            onClick={() => handleChange(r)}>
            {r}
        </li>
    );

    return (
        <>
            <h4 className="font-bold text-sm mt-4">Choose route:</h4>
            <ul>
                {listItems}
            </ul>
        </>
    );
};

export default List;
