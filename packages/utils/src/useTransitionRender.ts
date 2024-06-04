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
		}, TRANSITION_DURATION_MILLISECONDS) as unknown as number;

		return () => {
			resetTimer();
		};
	}, [isVisible, isRendered, resetTimer]);

	const show = () => setIsRendered(true);
	const hide = () => setIsVisible(false);

	const toggle = useCallback(() => {
		if (isRendered) {
			hide();
		} else {
			show();
		}
	}, [isRendered]);

	return {
		isVisible,
		isRendered,
		toggle,
		show,
		hide,
	};
}
