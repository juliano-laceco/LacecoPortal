import React, { useEffect, useState } from 'react'
import CustomSelect from './CustomSelect'
import { getAllClients } from '../../utils/client.jsx'
function ClientSelect({ error, onChange, className }) {
    const [clientsOption, setClientsOption] = useState()

    const fetchData = async () => {
        try {
            const clients = await getAllClients()
            const formattedData = clients.map(client => ({
                label: client.name,
                value: client
            }));

            setClientsOption(formattedData)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <CustomSelect label={'Client'} error={error} options={clientsOption} onChange={onChange} className={className} />
        </div>
    )
}

export default ClientSelect