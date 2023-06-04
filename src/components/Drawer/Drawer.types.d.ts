import type { IModal } from "../Modal/Modal.types";
import type { TTooltipPlacement } from "../Tooltip/Tooltip.types";

export interface IDrawer extends Omit<IModal, "onTransitionEnd"> {
	anchor?: TTooltipPlacement;
}
