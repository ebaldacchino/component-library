type TClassNames = Record<string, boolean> | string | undefined | false | null;

export function classNames(...args: TClassNames[]): string {
	const classNames: string[] = [];

	for (const arg of args) {
		if (!arg) {
			continue;
		}
		if (typeof arg === "string") {
			classNames.push(arg);
		} else if (arg !== null && typeof arg === "object") {
			for (const className in arg) {
				const isAddingClassName = arg[className];
				if (isAddingClassName) {
					classNames.push(className);
				}
			}
		}
	}

	return classNames.join(" ");
}

export default classNames;
