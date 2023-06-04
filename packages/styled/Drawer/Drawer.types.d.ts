import type { TPopperPlacementPrefix, ModalProps } from "@bui/base";

export interface DrawerProps extends Omit<ModalProps, "onTransitionEnd"> {
	anchor?: TPopperPlacementPrefix;
}
