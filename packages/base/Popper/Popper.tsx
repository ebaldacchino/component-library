import React, {
	type Dispatch,
	type ReactElement,
	type RefObject,
	type SetStateAction,
	useCallback,
	useEffect,
	useState,
	useRef,
} from "react";
import { Portal } from "..";
import styles from "./Popper.module.css";
import useEventListener from "../../../hooks/useEventListener";
import { classNames } from "../../helpers";

export interface IPopperLocation {
	top: number;
	left: number;
}

export type TPopperPlacementPrefix = "top" | "bottom" | "left" | "right";
export type TPopperPlacementSuffix = "start" | "end";
export type TPopperPlacement =
	| `${TPopperPlacementPrefix}-${TPopperPlacementSuffix}`
	| TPopperPlacementPrefix;

interface IPopper {
	placement: TPopperPlacement;
	children: ReactElement;
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	anchor: RefObject<HTMLElement>;
}

function getCurrentPlacement(
	placement: TPopperPlacement,
	childRect: DOMRect,
	anchorRect: DOMRect
): TPopperPlacement {
	const [prefix, suffix] = placement.split("-");
	let currentPlacement: TPopperPlacement;

	switch (prefix) {
		case "top":
			currentPlacement =
				anchorRect.y - childRect.height < 0 ? "bottom" : "top";
			break;
		case "right":
			currentPlacement =
				anchorRect.x + anchorRect.width + childRect.width >
				window.innerWidth + window.scrollX
					? "left"
					: "right";
			break;
		case "bottom":
			currentPlacement =
				anchorRect.bottom + childRect.height > window.innerHeight
					? "top"
					: "bottom";
			break;
		case "left":
			currentPlacement =
				anchorRect.x - childRect.width < 0 ? "right" : "left";
			break;
	}

	if (suffix) {
		currentPlacement += `-${suffix}`;
	}

	return currentPlacement;
}

export function Popper(props: IPopper) {
	const { children: el, placement = "top", anchor } = props;
	const ref = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [currentPlacement, setCurrentPlacement] = useState(placement);
	const [location, setLocation] = useState<IPopperLocation>({
		top: 0,
		left: 0,
	});

	const isRendered = isVisible || props.isVisible;

	const updatePosition = useCallback(() => {
		if (!anchor.current || !ref.current) {
			return;
		}

		const anchorRect = anchor.current.getBoundingClientRect();

		const { top, left, height, width } = anchorRect;

		const newPosition: IPopperLocation = {
			top: top + window.scrollY,
			left: left + window.scrollX,
		};

		const childRect = ref.current.getBoundingClientRect();
		const currentPlacement = childRect
			? getCurrentPlacement(placement, childRect, anchorRect)
			: placement;

		setCurrentPlacement(currentPlacement);

		switch (currentPlacement) {
			case "top":
			case "top-start":
			case "top-end":
				newPosition.top -= childRect.height;
				break;
			case "right":
			case "right-start":
			case "right-end":
				newPosition.left += width;
				break;
			case "bottom":
			case "bottom-start":
			case "bottom-end":
				newPosition.top += height;
				break;
			case "left":
			case "left-start":
			case "left-end":
				break;
		}

		switch (currentPlacement) {
			case "top":
			case "bottom":
				newPosition.left += width / 2;
				break;
			case "left":
			case "right":
				newPosition.top += height / 2;
				break;
			case "top-start":
			case "bottom-start":
				newPosition.left += childRect.width / 2;
				break;
			case "top-end":
			case "bottom-end":
				newPosition.left += width - childRect.width / 2;
				break;
			case "left-start":
			case "right-start":
				newPosition.top += childRect.height / 2;
				break;
			case "left-end":
			case "right-end":
				newPosition.top += height - childRect.height / 2;
				break;
		}

		setLocation(newPosition);
	}, [placement, anchor]);

	useEffect(() => {
		if (props.isVisible) {
			setIsVisible(true);
			updatePosition();
		}
	}, [props.isVisible, updatePosition]);

	useEffect(() => {
		if (!anchor.current || !props.isVisible) {
			return;
		}

		const observer = new ResizeObserver(updatePosition);

		observer.observe(document.body);
		observer.observe(anchor.current, { box: "border-box" });

		return () => {
			observer.disconnect();
		};
	}, [props.isVisible, updatePosition, anchor]);

	useEventListener(
		"scroll",
		updatePosition,
		undefined,
		undefined,
		isRendered
	);

	if (!isRendered) {
		return null;
	}

	const className = classNames(
		el.props.className,
		styles.popper,
		styles[currentPlacement.split("-")[0]],
		{
			[styles.visible]: isVisible && props.isVisible,
		}
	);

	const newProps = {
		...el.props,
		style: location,
		className,
		ref,
		onTransitionEnd: () => {
			if (!props.isVisible) {
				setIsVisible(false);
			}
		},
	};

	return (
		<Portal container={document.body} isVisible={isRendered}>
			{React.cloneElement(el, newProps)}
		</Portal>
	);
}
