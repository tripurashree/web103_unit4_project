import { useState } from 'react';
import { createCustomItem } from '../services/CustomCarAPI';

const CreateCustomItem = () => {
    const [name, setName] = useState('');
    const [features, setFeatures] = useState({});
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { name, features, total_price: price };
        await createCustomItem(newItem);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Item Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            {/* Add other fields for features */}
            <button type="submit">Create Custom Item</button>
        </form>
    );
};

export default CreateCustomItem;
