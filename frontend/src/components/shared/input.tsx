import React, { forwardRef, PropsWithChildren } from "react";
import { InputProps } from "../../utils/types";

interface TextInputProps extends InputProps {
	type?: string;
	placeholder?: string;
	maxLength?: number;
	required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = forwardRef((props, ref) => {
	const { className, ...restProps } = props;
	return (
		<input
			className={`
				bg-white ring-1 ring-secondary-gray-40
				focus:ring-primary-main focus:border-transparent focus:bg-secondary-main-10 
				disabled:cursor-not-allowed disabled:bg-secondary-gray-10
				rounded-lg py-3 px-2 ${className}
			`}
			ref={ref}
			autoComplete="off"
			{...restProps}
		/>
	)
})


interface ErrorTextProps extends PropsWithChildren {
	className?: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ children, className }) => {
	return (
		<p className={`font-roboto text-[#ff1f0d] ${className}`}>
			{children}
		</p>
	)
}

interface ValidatedInputProps extends PropsWithChildren {
	message: string | undefined;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({ children, message }) => {
	return (
		<div className="flex flex-col">
			{children}
			{message && <ErrorText>&nbsp;{message}</ErrorText>}
		</div>
	)
}