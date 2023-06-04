import { TPopperPlacementPrefix } from "@bui/base";
import type { ModalProps } from "@bui/base";

export interface DrawerProps extends Omit<ModalProps, "onTransitionEnd"> {
	anchor?: TPopperPlacementPrefix;
}
