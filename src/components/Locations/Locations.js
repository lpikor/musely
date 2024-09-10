import { useEffect, useState } from 'react';
import Location from './Location/Location';

function Locations() {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [capacity, setCapacity] = useState('');

    // Pobieranie miejscówek z API
    useEffect(() => {
        fetch('http://localhost:5001/api/locations')
            .then((res) => res.json())
            .then((data) => setLocations(data));
    }, []);

    // Dodawanie nowej miejscówki
    const handleAddLocation = (e) => {
        e.preventDefault();
        const newLocation = { name, city, capacity };

        fetch('http://localhost:5001/api/locations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLocation),
        })
            .then((res) => res.json())
            .then((location) => {
                setLocations([...locations, location]);
                setName('');
                setCity('');
                setCapacity('');
            });
    };

    // Usuwanie miejscówki
    const handleDelete = (id) => {
        fetch(`http://localhost:5001/api/locations/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setLocations(locations.filter((location) => location._id !== id));
        });
    };

    return (
        <div>
            <h2>Locations</h2>
            
            {/* Formularz do dodawania nowej miejscówki */}
            <form onSubmit={handleAddLocation}>
                <input
                    type="text"
                    placeholder="Nazwa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Miasto"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Pojemność"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
                <button type="submit">Dodaj miejscówkę</button>
            </form>

            {/* Wyświetlanie listy miejscówek */}
            <ul>
                {locations.map((location) => (
                    <li key={location._id}>
                        <Location
                            name={location.name}
                            city={location.city}
                            capacity={location.capacity}
                        />
                        <button onClick={() => handleDelete(location._id)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Locations;
