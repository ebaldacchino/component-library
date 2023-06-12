import { useEventListener } from "@bui/utils";
import { useState } from "react";

function calculateHasCursorLeftWindow(e: PointerEvent) {
	return (
		e.clientX < window.scrollX ||
		e.clientX > window.innerWidth + window.scrollX ||
		e.clientY < window.scrollY ||
		e.clientY > window.innerHeight + window.scrollY
	);
}

const documentBodyRef = { current: document.body } as const;

interface PointerEventsOptions<T extends HTMLElement> {
	onStart?: (e: React.PointerEvent<T>) => void;
	onMove: (e: PointerEvent) => void;
	onEnd?: (e: PointerEvent) => void;
}

export function useHandlePointerDrag<T extends HTMLElement>(
	options: PointerEventsOptions<T>
) {
	const [isEnabled, setIsEnabled] = useState(false);

	useEventListener(
		"pointermove",
		options.onMove,
		documentBodyRef,
		undefined,
		isEnabled
	);

	function handleEnd(e: PointerEvent) {
		setIsEnabled(false);
		options.onEnd?.(e);
	}

	useEventListener(
		"pointerup",
		handleEnd,
		documentBodyRef,
		undefined,
		isEnabled
	);
	useEventListener(
		"pointercancel",
		handleEnd,
		documentBodyRef,
		undefined,
		isEnabled
	);

	function handlePointerLeave(e: PointerEvent) {
		if (calculateHasCursorLeftWindow(e)) {
			handleEnd(e);
		}
	}

	useEventListener(
		"pointerleave",
		handlePointerLeave,
		documentBodyRef,
		undefined,
		isEnabled
	);

	function onPointerDown(e: React.PointerEvent<T>) {
		e.preventDefault();
		e.stopPropagation();

		const isTouchOrLeftMouseClick =
			e.button === 0 || e.pointerType === "touch";

		if (isTouchOrLeftMouseClick) {
			setIsEnabled(true);
			options.onStart?.(e);
		}
	}

	return { onPointerDown };
}
