import {
	type ForwardedRef,
	type RefObject,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { useEventListener } from "@bui/utils";
import type {
	IPopperLocation,
	TPopperPlacement,
	TPopperPlacementPrefix,
	TPopperPlacementSuffix,
} from "./Popper.types";

function useResizeObserver(
	anchor: RefObject<HTMLElement>,
	element: RefObject<HTMLElement>,
	callback: () => void,
	isEnabled: boolean
) {
	useEffect(() => {
		if (!element.current || !anchor.current || !isEnabled) {
			return;
		}

		callback();

		const observer = new ResizeObserver(callback);

		observer.observe(anchor.current);
		observer.observe(element.current);
		observer.observe(document.body);

		return () => {
			observer.disconnect();
		};
	}, [element, anchor, isEnabled, callback]);
}

function canFitAbove(anchorRect: DOMRect, popperRect: DOMRect) {
	const windowStart = 0;
	const defaultStart = anchorRect.y - popperRect.height;

	return defaultStart >= windowStart;
}

function canFitToRight(anchorRect: DOMRect, popperRect: DOMRect) {
	const defaultStart = anchorRect.x + anchorRect.width;
	const defaultEnd = defaultStart + popperRect.width;
	const windowEnd = window.innerWidth;

	return defaultEnd <= windowEnd;
}

function canFitBelow(anchorRect: DOMRect, popperRect: DOMRect) {
	const defaultStart = anchorRect.y + anchorRect.height;
	const defaultEnd = defaultStart + popperRect.height;
	const windowEnd = window.innerHeight;

	return defaultEnd <= windowEnd;
}

function canFitToLeft(anchorRect: DOMRect, popperRect: DOMRect) {
	const windowStart = 0;
	const defaultStart = anchorRect.x - popperRect.width;

	return defaultStart >= windowStart;
}

function getCurrentPlacementPrefix(
	prefix: TPopperPlacementPrefix,
	anchorRect: DOMRect,
	popperRect: DOMRect
): TPopperPlacementPrefix {
	let shouldFlip: boolean;

	switch (prefix) {
		case "top":
			shouldFlip =
				!canFitAbove(anchorRect, popperRect) &&
				canFitBelow(anchorRect, popperRect);
			return shouldFlip ? "bottom" : "top";

		case "right":
			shouldFlip =
				!canFitToRight(anchorRect, popperRect) &&
				canFitToLeft(anchorRect, popperRect);
			return shouldFlip ? "left" : "right";

		case "bottom":
			shouldFlip =
				!canFitBelow(anchorRect, popperRect) &&
				canFitAbove(anchorRect, popperRect);
			return shouldFlip ? "top" : "bottom";

		case "left":
			shouldFlip =
				!canFitToLeft(anchorRect, popperRect) &&
				canFitToRight(anchorRect, popperRect);
			return shouldFlip ? "right" : "left";
	}
}

function canStartHorizontally(anchorRect: DOMRect, popperRect: DOMRect) {
	const windowEnd = window.innerWidth + window.scrollX;
	const defaultStart = anchorRect.x;
	const defaultEnd = defaultStart + popperRect.width;

	return defaultEnd <= windowEnd;
}

function canMidHorizontally(anchorRect: DOMRect, popperRect: DOMRect) {
	const windowStart = 0;
	const windowEnd = window.innerWidth + window.scrollX;
	const defaultStart =
		anchorRect.x + anchorRect.width / 2 - popperRect.width / 2;
	const defaultEnd = defaultStart + popperRect.width;

	return defaultStart >= windowStart && defaultEnd <= windowEnd;
}

function canEndHorizontally(anchorRect: DOMRect, popperRect: DOMRect) {
	const windowStart = 0;
	const defaultEnd = anchorRect.x + anchorRect.width;
	const defaultStart = defaultEnd - popperRect.width;

	return defaultStart >= windowStart;
}

function canStartVertically(anchorRect: DOMRect, popperRect: DOMRect) {
	const windowEnd = window.innerHeight + window.scrollY;
	const defaultStart = anchorRect.y;
	const defaultEnd = defaultStart + popperRect.height;

	return defaultEnd <= windowEnd;
}

function canMidVertically(anchorRect: DOMRect, popperRect: DOMRect) {
	const windowStart = 0;
	const windowEnd = window.innerHeight + window.scrollY;
	const defaultStart =
		anchorRect.y + anchorRect.height / 2 - popperRect.height / 2;
	const defaultEnd = defaultStart + popperRect.height;

	return defaultStart >= windowStart && defaultEnd <= windowEnd;
}

function canEndVertically(anchorRect: DOMRect, popperRect: DOMRect) {
	const windowStart = 0;
	const defaultEnd = anchorRect.y + anchorRect.height;
	const defaultStart = defaultEnd - popperRect.height;

	return defaultStart >= windowStart;
}

function getCurrentPlacementSuffix(
	prefix: TPopperPlacementPrefix,
	suffix: TPopperPlacementSuffix | undefined,
	anchorRect: DOMRect,
	popperRect: DOMRect
): TPopperPlacementSuffix | undefined {
	const isSuffixHorizontal = prefix === "top" || prefix === "bottom";

	function shouldFlip(
		startFunc: (anchorRect: DOMRect, popperRect: DOMRect) => boolean,
		endFunc: (anchorRect: DOMRect, popperRect: DOMRect) => boolean
	) {
		return (
			!startFunc(anchorRect, popperRect) &&
			endFunc(anchorRect, popperRect)
		);
	}

	function determineSuffix(
		midFunc: (anchorRect: DOMRect, popperRect: DOMRect) => boolean,
		startFunc: (anchorRect: DOMRect, popperRect: DOMRect) => boolean,
		endFunc: (anchorRect: DOMRect, popperRect: DOMRect) => boolean
	) {
		if (prefix) {
			switch (suffix) {
				case "start":
					return shouldFlip(startFunc, endFunc) ? "end" : "start";
				case "end":
					return shouldFlip(endFunc, startFunc) ? "start" : "end";
			}
		}

		return midFunc(anchorRect, popperRect)
			? undefined
			: startFunc(anchorRect, popperRect)
			? "start"
			: endFunc(anchorRect, popperRect)
			? "end"
			: undefined;
	}

	if (isSuffixHorizontal) {
		return determineSuffix(
			canMidHorizontally,
			canStartHorizontally,
			canEndHorizontally
		);
	}

	return determineSuffix(
		canMidVertically,
		canStartVertically,
		canEndVertically
	);
}

function getCurrentPlacement(
	placement: TPopperPlacement,
	anchorRect: DOMRect,
	popperRect: DOMRect
): TPopperPlacement {
	const [prefix, suffix] = placement.split("-") as [
		TPopperPlacementPrefix,
		TPopperPlacementSuffix | undefined
	];

	const currentPrefix = getCurrentPlacementPrefix(
		prefix,
		anchorRect,
		popperRect
	);
	const currentSuffix = getCurrentPlacementSuffix(
		prefix,
		suffix,
		anchorRect,
		popperRect
	);

	if (currentSuffix) {
		return `${currentPrefix}-${currentSuffix}`;
	}

	return currentPrefix;
}

function adjustHorizontalPosition(
	position: IPopperLocation,
	currentPlacement: TPopperPlacement,
	anchorRect: DOMRect,
	popperRect: DOMRect
) {
	switch (currentPlacement) {
		case "top-start":
		case "bottom-start":
			break;
		case "top-end":
		case "bottom-end":
			position.left += anchorRect.width - popperRect.width;
			break;
		case "top":
		case "bottom":
			position.left += anchorRect.width / 2;
			position.left -= popperRect.width / 2;
			break;
		case "right":
		case "right-start":
		case "right-end":
			position.left += anchorRect.width;
			break;
		case "left":
		case "left-start":
		case "left-end":
			position.left -= popperRect.width;
			break;
	}
}

function adjustVerticalPosition(
	position: IPopperLocation,
	currentPlacement: TPopperPlacement,
	anchorRect: DOMRect,
	popperRect: DOMRect
) {
	switch (currentPlacement) {
		case "right-end":
		case "left-end":
			position.top += anchorRect.height - popperRect.height;
			break;
		case "top":
		case "top-start":
		case "top-end":
			position.top -= popperRect.height;
			break;
		case "right":
			position.top += anchorRect.height / 2;
			position.top -= popperRect.height / 2;
			break;
		case "bottom":
		case "bottom-start":
		case "bottom-end":
			position.top += anchorRect.height;
			break;
		case "left":
			position.top += anchorRect.height / 2;
			position.top -= popperRect.height / 2;
			break;
	}
}

function isElementDisplayNone(el: HTMLElement) {
	return window.getComputedStyle(el).display === "none";
}

export function usePopper(
	props: {
		isVisible: boolean;
		anchor: RefObject<HTMLElement>;
		placement: TPopperPlacement;
	},
	ref: ForwardedRef<HTMLElement>
) {
	const popperEl = useRef<HTMLDivElement>(null);

	useImperativeHandle(ref, () => popperEl.current);

	const [currentPlacement, setCurrentPlacement] = useState<TPopperPlacement>(
		props.placement
	);
	const [location, setLocation] = useState<IPopperLocation>({
		top: 0,
		left: 0,
		position: "absolute",
	});

	const updatePosition = useCallback(() => {
		const anchorRect = props.anchor.current?.getBoundingClientRect();
		const popperRect =
			popperEl.current?.children[0].getBoundingClientRect();

		if (
			!popperRect ||
			!anchorRect ||
			!props.anchor.current ||
			isElementDisplayNone(props.anchor.current)
		) {
			return;
		}

		const currentPlacement = getCurrentPlacement(
			props.placement,
			anchorRect,
			popperRect
		);

		const newPosition: IPopperLocation = {
			top: anchorRect.top + window.scrollY,
			left: anchorRect.left + window.scrollX,
			position: "absolute",
		};

		adjustHorizontalPosition(
			newPosition,
			currentPlacement,
			anchorRect,
			popperRect
		);
		adjustVerticalPosition(
			newPosition,
			currentPlacement,
			anchorRect,
			popperRect
		);

		setCurrentPlacement(currentPlacement);
		setLocation(newPosition);
	}, [props.placement, props.anchor]);

	useResizeObserver(props.anchor, popperEl, updatePosition, props.isVisible);
	useEventListener(
		"scroll",
		updatePosition,
		undefined,
		undefined,
		props.isVisible
	);

	return { currentPlacement, location, popperEl };
}
