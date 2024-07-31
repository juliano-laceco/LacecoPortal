export function formatDate(date, format = 'YYYY-MM-DD') {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
    const day = ('0' + parsedDate.getDate()).slice(-2);
    const hours = ('0' + parsedDate.getHours()).slice(-2);
    const minutes = ('0' + parsedDate.getMinutes()).slice(-2);
    const seconds = ('0' + parsedDate.getSeconds()).slice(-2);

    switch (format) {
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'YYYY/MM/DD':
            return `${year}/${month}/${day}`;
        case 'YYYY-MM-DDTHH:mm:ss':
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        case 'YYYY-MM-DD HH:mm:ss':
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        case 'MM/DD/YYYY HH:mm:ss':
            return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        case 'DD/MM/YYYY HH:mm:ss':
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        case 'YYYY/MM/DD HH:mm:ss':
            return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        case 'HH:mm:ss':
            return `${hours}:${minutes}:${seconds}`;
        case 'YYYY':
            return `${year}`;
        case 'MM':
            return `${month}`;
        case 'DD':
            return `${day}`;
        case 'm-y':
            return parsedDate.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric"
            });
        case 'd-m-y':
            return parsedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        case 'm':
            return parsedDate.toLocaleDateString("en-GB", {
                month: "long"
            });
        // Add more cases for different formats as needed
        default:
            throw new Error('Unsupported date format');
    }
}