export default Popover;

declare function Popover(props: PopoverProps): JSX.Element;
interface PopoverProps {
  /** Where the popover content is positioned relative to the trigger or getPositioningElement. */
  align?: AlignTypes.ALL;
  /** Content of the popover */
  children: node;
  /** Displays as a "tooltip" style with white text on black background. */
  isDark?: boolean;
  /** Activated by mouseOver / focus instead of onClick. */
  isEager?: boolean;
  /** How "controlled" popovers are shown / hidden. */
  isOpen?: boolean;
  /** This renders the popover inline in the DOM and not in a react portal. WARNING: will have side effects with paprika side panels and modals, use with caution. */
  isPortal?: boolean;
  /** How "uncontrolled" popovers can be rendered open by default. */
  defaultIsOpen?: boolean;
  /** Where the edge of the popover content is based on the trigger or getPositioningElement */
  edge?: AlignTypes.LEFT | AlignTypes.RIGHT | null;
  /** Maximum width of popover content. Using a number is recommended and implies px units. */
  maxWidth?: string | number;
  /** Minimumn width of popover content. Using a number is recommended and implies px units. */
  minWidth?: string | number;
  /** Callback to fire when user closes popover. */
  onClose?: func;
  /** Distance, in px, between popover content edge and trigger / getPositioningElement. */
  offset?: number;
  /** Function that provides DOM element to use as target for positioning the popover. */
  getPositioningElement?: func;
  /** Function that provides the scrolling DOM element that contains the popover. */
  getScrollContainer?: func;
  /** If focus will stay at the trigger when showing popover. Popover can still be closed when clicking outside or pressing escape key. */
  shouldKeepFocus?: boolean;
  /** Number setting the z-index for the popover content / tip. */
  zIndex?: number;
}
declare namespace Popover {
  function Trigger(props: TriggerProps): JSX.Element;
  interface TriggerProps {
    /** Descriptive a11y text for assistive technologies for the trigger. */
    a11yText?: string;

    children: func | node;
  }
}
declare namespace Popover {
  function Content(props: ContentProps): JSX.Element;
  interface ContentProps {
    children?: node;
    /** Callback to indicate the element loses focus */
    onBlur?: func;
  }
}
declare namespace Popover {
  function Card(props: CardProps): JSX.Element;
  interface CardProps {
    children: node;
  }
}
declare namespace Popover {
  function Tip(props: TipProps): JSX.Element;
  interface TipProps {
    /** Number setting the z-index */
    zIndex?: number;
  }
}
