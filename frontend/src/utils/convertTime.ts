export const formatTime = (timestamp:string) => {
    const dateObj = new Date(timestamp);
  
    const formattedDateTime = dateObj.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', ''); 
  
    return formattedDateTime;
  };
  