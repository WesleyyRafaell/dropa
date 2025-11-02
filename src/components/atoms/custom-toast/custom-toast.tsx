import { HTMLAttributes } from 'react';
import { ToastContentProps } from 'react-toastify';

const CustomProgressBar = ({
	closeToast,
	isPaused,
	toastProps,
	data,
}: ToastContentProps<{ message: string }>) => {
	const strokeDash = 565.48;
	const attributes: HTMLAttributes<SVGCircleElement> = {};

	// handle controlled progress bar
	// controlled progress bar uses a transition
	if (typeof toastProps.progress === 'number') {
		attributes.style = {
			transition: 'all .1s linear',
			strokeDashoffset: `${strokeDash - strokeDash * toastProps.progress}px`,
		};

		if (toastProps.progress >= 1) {
			attributes.onTransitionEnd = () => {
				closeToast();
			};
		}
	} else {
		// normal autoclose uses an animation
		// animation inside index.css
		attributes.className = 'animate';
		attributes.style = {
			animationDuration: `${toastProps.autoClose}ms`,
			animationPlayState: isPaused ? 'paused' : 'running',
		};

		attributes.onAnimationEnd = () => {
			closeToast();
		};
	}

	return (
		<div className="flex justify-between items-center w-full">
			<p>{data.message}</p>
			<svg
				width="40"
				height="40"
				viewBox="-25 -25 250 250"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				className="-rotate-90"
			>
				<circle
					r="90"
					cx="100"
					cy="100"
					fill="transparent"
					stroke="#e0e0e0"
					stroke-width="6"
					stroke-dasharray={`${strokeDash}px`}
					strokeDashoffset="0"
				/>
				<circle
					r="90"
					cx="100"
					cy="100"
					stroke="#76e5b1"
					stroke-width="16px"
					stroke-linecap="round"
					fill="transparent"
					stroke-dasharray={`${strokeDash}px`}
					{...attributes}
				/>
			</svg>
		</div>
	);
};

export default CustomProgressBar;
