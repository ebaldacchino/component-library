import { useCallback, useRef, useState } from "react";
import { Popper } from "..";
import { ITooltip } from "../Tooltip/Tooltip.types";
import styles from "./Popover.module.css";
import { classNames } from "../../helpers";
import useEventListener from "../../../hooks/useEventListener";

export function Popover(props: ITooltip) {
	const { children, title, placement = "top" } = props;
	const childEl = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	const popoverClassNames = classNames(styles.container, props.className);

	const handleClick = useCallback(
		(e: MouseEvent) => {
			if (!childEl.current) {
				return;
			}
			const popoverSelector = popoverClassNames
				.split(" ")
				.map((c) => "." + c)
				.join(" ");

			const popoverEl = document.querySelector(popoverSelector);

			if (!popoverEl) {
				return;
			}

			const popoverNestedChildren = popoverEl.querySelectorAll("*");

			const isClickedAway =
				popoverEl !== e.target &&
				![...popoverNestedChildren].some((child) => child === e.target);

			if (isClickedAway) {
				setIsVisible(false);
			}
		},
		[popoverClassNames]
	);

	useEventListener(
		"pointerdown",
		handleClick,
		undefined,
		undefined,
		isVisible
	);

	return (
		<>
			<children.type
				{...children.props}
				key={children.key}
				onClick={() => setIsVisible((p) => !p)}
				ref={childEl}
			/>

			<Popper
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				placement={placement}
				anchor={childEl}
			>
				<div role="tooltip" className={popoverClassNames}>
					<div>{title}</div>
				</div>
			</Popper>
		</>
	);
}
