export default Toast;

declare function Toast(props: ToastProps): JSX.Element;
interface ToastProps {
  /** Duration (in ms) before Toast will automaticall close (if canAutoClose is true) */
  autoCloseDelay?: number;
  /** Will automatically close after 1500ms (or longer if provided by autoCloseDelay) */
  canAutoClose?: boolean;
  /** Content of the Toast */
  children?: node;
  /** If the component should have a 'close' button */
  hasCloseButton?: boolean;
  /** How "controlled" toast is shown / hidden. */
  isOpen?: boolean;
  /** If the Toast is fixed to the top of the viewport. This will render the Toast as a Portal. */
  isFixed?: boolean;
  /** A11y: If the toast is polite or not. If false, then the toast will be assertive. */
  isPolite?: boolean;
  /** Determines the styling of the Toast */
  kind?: Kinds.ALL;
  /** Callback that is executed after clicking the 'close' button */
  onClose?: func;
  /** The z-index of the Toast */
  zIndex?: number;
}
