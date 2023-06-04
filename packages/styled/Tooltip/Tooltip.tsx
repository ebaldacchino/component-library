import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./Tooltip.module.css";
import type { TooltipElement, TooltipProps } from "./Tooltip.types";
import { Popper } from "@bui/base";
import { classNames, useTransitionRender } from "@bui/utils";

export const Tooltip = forwardRef<TooltipElement, TooltipProps>(
	(props, ref) => {
		const {
			children: el,
			title,
			placement = "top",
			disableHoverListener,
		} = props;
		const anchorEl = useRef<HTMLElement>(null);
		const popoverEl = useRef<HTMLElement>(null);
		const { isRendered, isVisible, toggle, show, hide } =
			useTransitionRender();

		useImperativeHandle(ref, () => {
			return {
				toggle,
				show,
				hide,
			};
		});

		const tooltipClassNames = classNames(
			styles.container,
			props.className,
			{ [styles.visible]: isVisible }
		);

		return (
			<>
				<el.type
					{...el.props}
					key={el.key}
					onPointerLeave={disableHoverListener ? undefined : hide}
					onPointerEnter={disableHoverListener ? undefined : show}
					onPointerCancel={disableHoverListener ? undefined : hide}
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
							className={tooltipClassNames}
						>
							<div className={styles.body}>{title}</div>
						</div>
					)}
				</Popper>
			</>
		);
	}
);