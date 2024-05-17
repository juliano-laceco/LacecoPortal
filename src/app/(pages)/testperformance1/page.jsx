"use client"

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRoles } from '@/utilities/db-utils';

const getRolesKey = 'roles'; // Define a unique key for the cached data

function Perf() {

    const { isLoading, error, data, refetch: refetchRoles } = useQuery({
        queryFn: async () => await getRoles(),
        queryKey: getRolesKey,

        staleTime: Infinity, // Cache data for 1 hour
    });
    const [loadTimeFirstSearch, setLoadTimeFirstSearch] = useState(null);
    const [loadTimeSecondSearch, setLoadTimeSecondSearch] = useState(null);

    const handleFirstSearch = async () => {
        const startTime = performance.now();
        await refetchRoles(); // Trigger the initial fetch
        const endTime = performance.now();
        setLoadTimeFirstSearch(endTime - startTime);
    };

    const handleSecondSearch = async () => {
        const startTime = performance.now();
        await refetchRoles(); // Trigger the initial fetch
        const endTime = performance.now();
        setLoadTimeSecondSearch(endTime - startTime);
    };

    return (
        <div>
            <button onClick={handleFirstSearch}>One</button>
            <button onClick={handleSecondSearch}>Two</button>
            {loadTimeFirstSearch !== null && (
                <p>Load Time for First Search: {loadTimeFirstSearch} milliseconds</p>
            )}
            {loadTimeSecondSearch !== null && (
                <p>Load Time for Second Search: {loadTimeSecondSearch} milliseconds</p>
            )}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <p>Roles: {JSON.stringify(data)}</p>}
        </div>
    );
}

export default Perf;
