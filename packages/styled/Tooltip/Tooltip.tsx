import { useRef, useState } from "react";
import styles from "./Tooltip.module.css";
import type { ITooltip } from "./Tooltip.types";
import { Popper } from "..";
import { classNames } from "../../helpers";

export function Tooltip(props: ITooltip) {
	const { children: el, title, placement = "top" } = props;
	const childEl = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	const tooltipClassNames = classNames(styles.container, props.className);

	return (
		<>
			<el.type
				{...el.props}
				key={el.key}
				onPointerEnter={() => {
					setIsVisible(true);
				}}
				onPointerLeave={() => setIsVisible(false)}
				onPointerCancel={() => setIsVisible(false)}
				ref={childEl}
			/>

			<Popper
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				placement={placement}
				anchor={childEl}
			>
				<div role="tooltip" className={tooltipClassNames}>
					<div className={styles.body}>{title}</div>
				</div>
			</Popper>
		</>
	);
}
