import React, { useEffect, useState } from 'react'
import CustomSelect from './CustomSelect'
import { getClientCars } from '../../utils/car.jsx'

function CarSelect({ error, onChange, client_slug, className }) {
    const [carsOption, setCarsOption] = useState()

    const fetchData = async () => {
        try {
            const cars = await getClientCars(client_slug)
            const formattedData = cars.map(car => ({
                label: `${car.make} ${car.model} ${car.year}`,
                value: car
            }));

            setCarsOption(formattedData)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [client_slug])

    return (
        <div>
            <CustomSelect label={'Cars'} error={error} options={carsOption} onChange={onChange} className={className} />
        </div>
    )
}

export default CarSelect