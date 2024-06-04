import { useCallback, useEffect, useRef, useState } from "react";

const TRANSITION_DURATION_MILLISECONDS = 200;

export function useTransitionRender() {
	const [isVisible, setIsVisible] = useState(false);
	const [isRendered, setIsRendered] = useState(false);
	const timerRef = useRef<number | undefined>(undefined);

	const resetTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = undefined;
		}
	}, []);

	useEffect(() => {
		if (isRendered) {
			setIsVisible(true);
			resetTimer();
		}
	}, [isRendered, resetTimer]);

	useEffect(() => {
		if (isVisible || !isRendered) {
			return;
		}

		timerRef.current = setTimeout(() => {
			setIsRendered(false);
		}, TRANSITION_DURATION_MILLISECONDS);

		return () => {
			resetTimer();
		};
	}, [isVisible, isRendered, resetTimer]);

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
