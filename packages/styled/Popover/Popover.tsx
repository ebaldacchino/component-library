import { useCallback, useRef } from "react";
import { Popper, type TPopperPlacement } from "@bui/base";
import styles from "./Popover.module.css";
import { classNames, useEventListener, useTransitionRender } from "@bui/utils";

interface PopoverProps {
	children: JSX.Element;
	title: string;
	placement: TPopperPlacement;
	className?: string;
}

export function Popover(props: PopoverProps) {
	const { children, title, placement = "top" } = props;
	const anchorEl = useRef<HTMLElement>(null);
	const popoverEl = useRef<HTMLElement>(null);
	const { isRendered, isVisible, toggle, hide } = useTransitionRender();

	const popoverClassNames = classNames(styles.container, props.className, {
		[styles.visible]: isVisible,
	});

	const handleClick = useCallback(
		(e: MouseEvent) => {
			if (
				!anchorEl.current ||
				!popoverEl.current ||
				!(e.target instanceof Element)
			) {
				return;
			}

			const isClickedWithinPopover =
				popoverEl.current === e.target ||
				(e.target && popoverEl.current.contains(e.target));

			const isClickedWithinAnchor =
				anchorEl.current === e.target ||
				(e.target && anchorEl.current.contains(e.target));

			if (!isClickedWithinPopover && !isClickedWithinAnchor) {
				hide();
			}
		},
		[hide]
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
				onClick={toggle}
				ref={anchorEl}
			/>

			<Popper
				ref={popoverEl}
				isVisible={isRendered}
				placement={placement}
				anchor={anchorEl}
			>
				{(p) => (
					<div
						ref={p.ref}
						style={p.style}
						role="tooltip"
						className={popoverClassNames}
					>
						<div className={styles.body}>{title}</div>
					</div>
				)}
			</Popper>
		</>
	);
}
