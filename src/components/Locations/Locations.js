import Location from './Location/Location';

const locationsData = [
	{ id: 1, name: 'Pub Spółdzielczy', city: 'Rzeszów', capacity: 200 },
	{ id: 2, name: 'Klub Kwadrat', city: 'Kraków', capacity: 150 },
	{ id: 3, name: 'Klub Progresja', city: 'Warszawa', capacity: 300 }
]

function Locations() {
	return (
		<div>
			<h1>Locations</h1>
			<ul>
				{locationsData.map((location) => (
					<li key={location.id}>
						<Location
							name={location.name}
							city={location.city}
							capacity={location.capacity}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Locations;