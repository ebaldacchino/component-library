import styles from "./ImagePreview.module.css";
import { useRef, useEffect } from "react";

interface ImagePreviewProps {
	file: File;
}

export function ImagePreview({ file }: ImagePreviewProps) {
	const urlRef = useRef<string>("");

	useEffect(() => {
		const newUrl = URL.createObjectURL(file);
		urlRef.current = newUrl;

		return () => {
			URL.revokeObjectURL(newUrl);
		};
	}, [file]);

	return (
		<img src={urlRef.current} alt={file.name} className={styles.image} />
	);
}
