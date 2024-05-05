export const formatAddress = (num: string) => {
    const str = num.toString();
    return `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6, 8)}-${str.slice(8)}`;
}
