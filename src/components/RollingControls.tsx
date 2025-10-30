import {ButtonHTMLAttributes} from "react";

type RollingControlsProps = {
  onRoll: () => void;
  isRollDisabled: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const RollingControls = ({
  onRoll,
  isRollDisabled,
  ...props
}: RollingControlsProps) => {
  return (
    <button
      onClick={onRoll}
      disabled={isRollDisabled}
      className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      Roll
    </button>
  );
};
