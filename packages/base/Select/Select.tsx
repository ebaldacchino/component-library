import { type SelectHTMLAttributes, forwardRef } from "react";
import { FormControl } from "../FormControl";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	value: string;
	options: { id: string; label: string }[];
	error?: boolean | string;
}

const Caret = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
	</svg>
);
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(props, ref) => {
		const { options, error, label, ...fieldProps } = props;
		return (
			<FormControl {...fieldProps} error={error} label={label}>
				<div>
					<select {...fieldProps} ref={ref}>
						<option></option>
						{options.map((option) => {
							return (
								<option key={option.id} value={option.id}>
									{option.label}
								</option>
							);
						})}
					</select>
					<div>
						<Caret />
					</div>
				</div>

				{/* dropdown */}
				{/* i think material ui have select and option utils that they style and use */}
				{/* use popper to position dropdown? */}
				{/* return focus to field? */}
				{/* keyboard navigation */}
			</FormControl>
		);
	}
);
