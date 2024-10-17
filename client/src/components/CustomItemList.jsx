import { useEffect, useState } from 'react';
import { getAllCustomItems } from '../services/CustomCarAPI';

const CustomItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getAllCustomItems();
            setItems(data);
        };
        fetchItems();
    }, []);

    return (
        <div>
            {items.map(item => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Price: {item.total_price}</p>
                    {/* Add buttons for edit and delete */}
                </div>
            ))}
        </div>
    );
};

export default CustomItemList;
