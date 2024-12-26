export type KeyOfType<T, Type> = {
	[K in keyof T]: T[K] extends Type ? K : never;
}[keyof T];
