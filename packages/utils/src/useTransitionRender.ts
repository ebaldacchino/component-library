import { useCallback, useEffect, useState } from "react";

const TRANSITION_DURATION_MILLISECONDS = 200;

export function useTransitionRender() {
	const [isVisible, setIsVisible] = useState(false);
	const [isRendered, setIsRendered] = useState(false);

	useEffect(() => {
		if (isRendered) {
			setIsVisible(true);
		}
	}, [isRendered]);

	useEffect(() => {
		if (isVisible || !isRendered) {
			return;
		}

		const timer = setTimeout(() => {
			setIsRendered(false);
		}, TRANSITION_DURATION_MILLISECONDS);

		return () => {
			clearTimeout(timer);
		};
	}, [isVisible, isRendered]);

	const toggle = useCallback(() => {
		if (isRendered) {
			setIsVisible(false);
		} else {
			setIsRendered(true);
		}
	}, [isRendered]);

	return {
		isVisible,
		isRendered,
		toggle,
	};
}
