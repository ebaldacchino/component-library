import styles from "./FilePicker.module.css";

interface FilePickerProps {
	name: string;
	value: File[];
	onChange: (props: File[]) => void;
	multiple?: boolean;
	isDisabled?: boolean;
	acceptedFiles: string[];
	/* Maximum file size in megabytes */
	maximumFileSize?: number;
	maximumFilesCount?: number;
}

const BYTES_PER_MEGABYTE = 1024 * 1024;

function getIsAcceptedFileMimeType(
	fileType: string,
	acceptedFiles: string[]
): boolean {
	for (const acceptedFileType of acceptedFiles) {
		if (acceptedFileType.endsWith("*")) {
			if (fileType.startsWith(acceptedFileType.slice(0, -1))) {
				return true;
			}
		} else {
			if (fileType === acceptedFileType) {
				return true;
			}
		}
	}
	return false;
}

export function FilePicker(props: FilePickerProps) {
	function getValidationErrorMessage(file: File): string | undefined {
		const isAcceptedFile = getIsAcceptedFileMimeType(
			file.type,
			props.acceptedFiles
		);

		if (!isAcceptedFile) {
			return file.name + " is of an unsupported file type";
		}

		const isMaximumFileSizeExceeded =
			typeof props.maximumFileSize === "number" &&
			file.size > props.maximumFileSize * BYTES_PER_MEGABYTE;

		if (isMaximumFileSizeExceeded) {
			return `Maximum supported file size is ${props.maximumFileSize}`;
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { files } = e.currentTarget;
		if (!files?.length) {
			return;
		}

		const newFiles: File[] = [];

		const hasExceededMaximumFilesCount =
			typeof props.maximumFilesCount === "number" &&
			files.length > props.maximumFilesCount;

		if (hasExceededMaximumFilesCount) {
			const message = `Can only upload a maximum of ${props.maximumFilesCount} files`;
			throw new Error(message);
		}

		for (const file of Array.from(files)) {
			const validationErrorMessage = getValidationErrorMessage(file);

			if (validationErrorMessage) {
				throw new Error(validationErrorMessage);
			}

			newFiles.push(file);
		}

		props.onChange(newFiles);
	}

	const labelText = props.isDisabled
		? "File upload unavailable"
		: "Drop files or click to upload";

	return (
		<form className={styles.form}>
			<label className={styles.label} htmlFor={props.name}>
				{labelText}
			</label>
			<input
				value={""}
				type="file"
				onChange={handleChange}
				disabled={props.isDisabled}
				accept={props.acceptedFiles.join(", ")}
				multiple={props.multiple}
				className={styles.input}
				name={props.name}
				id={props.name}
			/>
		</form>
	);
}
