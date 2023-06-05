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
import { classNames } from "../helpers";
import styles from "./Popper.module.css";
import type {
	ITooltipPosition,
	TTooltipPlacement,
} from "../Tooltip/Tooltip.types";
import useEventListener from "../../hooks/useEventListener";

interface IPopper {
	placement: TTooltipPlacement;
	children: ReactElement;
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	selector: RefObject<HTMLElement>;
}

function getCurrentPlacement(
	placement: TTooltipPlacement,
	rect: DOMRect
): TTooltipPlacement {
	switch (placement) {
		case "top":
			return rect.y < 0 ? "bottom" : "top";
		case "right":
			return rect.x > window.innerWidth + window.scrollX
				? "left"
				: "right";
		case "bottom":
			return rect.y > window.innerHeight + window.scrollY
				? "top"
				: "bottom";
		case "left":
			return rect.x < 0 ? "right" : "left";
	}
}

export function Popper(props: IPopper) {
	const { children: el, placement = "top", selector } = props;
	const ref = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [currentPlacement, setCurrentPlacement] = useState(placement);
	const [location, setLocation] = useState<ITooltipPosition>({
		top: 0,
		left: 0,
	});

	const isRendered = isVisible || props.isVisible;

	const updatePosition = useCallback(() => {
		if (!selector.current) {
			return;
		}

		const rect = selector.current.getBoundingClientRect();

		const { top, left, height, width } = rect;

		const newPosition: ITooltipPosition = {
			top: top + window.scrollY,
			left: left + window.scrollX,
		};

		const tooltipRect = ref.current?.getBoundingClientRect();
		const currentPlacement = tooltipRect
			? getCurrentPlacement(placement, tooltipRect)
			: placement;
		setCurrentPlacement(currentPlacement);

		switch (currentPlacement) {
			case "top":
				newPosition.top -= height;
				newPosition.left += width / 2;
				break;
			case "right":
				newPosition.top += height / 2;
				newPosition.left += width;
				break;
			case "bottom":
				newPosition.top += height;
				newPosition.left += width / 2;
				break;
			case "left":
				newPosition.top += height / 2;
				break;
		}

		setLocation(newPosition);
	}, [placement, selector]);

	useEffect(() => {
		if (props.isVisible) {
			setIsVisible(true);
			updatePosition();
		}
	}, [props.isVisible, updatePosition]);

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
		styles[currentPlacement],
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
