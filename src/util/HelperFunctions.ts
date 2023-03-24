export function currencyConverter(amount: number): string {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function dateConverter(timestamp: number): Date {
    return new Date(timestamp);
}

export function dateToString(date: Date): string {
    return date.toLocaleDateString();
}