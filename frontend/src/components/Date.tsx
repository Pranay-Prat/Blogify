export const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };
