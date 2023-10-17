export const formatNumberTo2Digits = (number: number): string =>
	number < 10 ? `0${number}` : number.toString();

export const isoDateString = (date = new Date()) =>
	date.toISOString().split("T")[0];
