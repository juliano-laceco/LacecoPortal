"use client"

import React, { useState } from 'react';
import  getRolesCache  from '@/utilities/db-utils';

function Perf() {
    const [loadTimeFirstSearch, setLoadTimeFirstSearch] = useState(null);
    const [loadTimeSecondSearch, setLoadTimeSecondSearch] = useState(null);

    const handleFirstSearch = async () => {
        const startTime = performance.now();
        await getRolesCache();
        const endTime = performance.now();
        setLoadTimeFirstSearch(endTime - startTime);
    };

    const handleSecondSearch = async () => {
        const startTime = performance.now();
        await getRolesCache();
        const endTime = performance.now();
        setLoadTimeSecondSearch(endTime - startTime);
    };

    return (
        <div>
            <button onClick={handleFirstSearch}>One</button>
            <button onClick={handleSecondSearch}>Two</button>
            {loadTimeFirstSearch !== null && <p>Load Time for First Search: {loadTimeFirstSearch} milliseconds</p>}
            {loadTimeSecondSearch !== null && <p>Load Time for Second Search: {loadTimeSecondSearch} milliseconds</p>}
        </div>
    );
};

export default Perf;