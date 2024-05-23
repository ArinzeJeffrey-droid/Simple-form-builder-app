import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import React from "react";

type ButtonTargetProps =
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
  | LinkProps;

function shouldRenderAsAnchor(
  props: ButtonTargetProps
): props is React.AnchorHTMLAttributes<HTMLAnchorElement> {
  return props.hasOwnProperty("href");
}
function shouldRenderAsLink(props: ButtonTargetProps): props is LinkProps {
  return props.hasOwnProperty("to");
}
export type Props = React.PropsWithChildren<
  { variant?: keyof typeof BUTTON_CLASSES } & ButtonTargetProps
>;
const BUTTON_CLASSES = {
  primary:
    "relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md hover:opacity-75 border bg-green border-green-lightest shadow-sm text-xs px-2.5 py-1 h-[26px] text-white lg:block",
  secondary:
    "relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md transition-all bg-gray-lightest border border-gray-light text-white hover:opacity-75 shadow-sm text-sm px-4 py-2 h-[38px]",
};
function Button({ variant = "primary", ...props }: Props): React.ReactElement {
  const className = clsx(
    BUTTON_CLASSES[variant],
    // @ts-ignore
    props.className
  );
  if (shouldRenderAsAnchor(props)) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...props} className={className} />;
  }
  if (shouldRenderAsLink(props)) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <Link {...props} className={className} />;
  }
  return <button {...props} className={className} />;
}
export default Button;
