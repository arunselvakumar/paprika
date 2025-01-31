export default Panel;

declare function Panel(props: PanelProps): JSX.Element;
interface PanelProps {
  [x: string]: any;

  a11yText?: string;
  /** The content for the Panel. */
  children: React.ReactNode;
  /** Function that provides the container DOM element to be pushed. */
  getPushContentElement?: (...args: any[]) => any;
  /** Y offset that is passed down from <Panel.Group> */
  groupOffsetY?: number;
  /** The height of the open Panel (when slide in from bottom) */
  height?: string | number;
  /** Render the panel inline */
  isInline?: boolean;
  /** Control the visibility of the Panel. This prop makes the Panel appear. */
  isOpen?: boolean;
  /** Control the size of the Panel */
  size?: Panel.types.sizes.MEDIUM | Panel.types.sizes.LARGE;
  /** Control offset of the Panel. Only use 'top' when sliding in from the left or right. Only use 'left' or 'right' when sliding in from the bottom. */
  offset?: shape;
  /** Callback once the Panel has been closed event */
  onAfterClose?: (...args: any[]) => any;
  /** Callback once the Panel has been opened event */
  onAfterOpen?: (...args: any[]) => any;
  /** Callback triggered when the Panel needs to be close */
  onClose?: (...args: any[]) => any;
  /** Control where the Panel slides in from */
  slideFrom?: Panel.types.slideFroms.RIGHT | Panel.types.slideFroms.LEFT | Panel.types.slideFroms.BOTTOM;
  /** The width of the open Panel (when slide in from left or right) */
  width?: string | number;
  /** Control the z-index of the Panel */
  zIndex?: number;
}

declare namespace Panel {
  function Header(props: HeaderProps): JSX.Element;
  interface HeaderProps {
    [x: string]: any;

    children: React.ReactNode;

    getPushContentElement?: (...args: any[]) => any;

    hasCloseButton?: boolean;

    isHeaderSticky?: boolean;

    hasAccent?: boolean;

    onClose?: (...args: any[]) => any;

    refHeading?: custom;
  }
}
declare namespace Panel {
  function Content(props: ContentProps): JSX.Element;
  interface ContentProps {
    [x: string]: any;
    /** Body content of the Content */
    children?: React.ReactNode;
  }
}
declare namespace Panel {
  function Footer(props: FooterProps): JSX.Element;
  interface FooterProps {
    [x: string]: any;

    children: React.ReactNode;

    isSticky?: boolean;
  }
}
declare namespace Panel {
  function Overlay(props: OverlayProps): JSX.Element;
  interface OverlayProps {
    [x: string]: any;

    backdropClassName?: string;

    children?: (...args: any[]) => any;
    /** container of the Overlay element */
    container?: React.ReactNode;

    focusLockOptions?: shape;

    hasBackdrop?: boolean;

    isOpen?: boolean;

    onClose?: (...args: any[]) => any;

    onAfterOpen?: (...args: any[]) => any;

    onAfterClose?: (...args: any[]) => any;
    /** The z-index of the Panel Overlay */
    zIndex?: number;
  }
}
declare namespace Panel {
  function Trigger(props: TriggerProps): JSX.Element;
  interface TriggerProps {
    [x: string]: any;

    children: React.ReactNode;
  }
}

declare namespace Panel {
  namespace types {
    namespace slideFroms {
      const RIGHT: any;
      const LEFT: any;
      const BOTTOM: any;
    }
  }
}

declare namespace Panel {
  namespace types {
    namespace widthTypes {
      const SMALL: any;
      const MEDIUM: any;
      const LARGE: any;
    }
  }
}

declare namespace Panel {
  namespace types {
    namespace size {
      const MEDIUM: any;
      const LARGE: any;
    }
  }
}
