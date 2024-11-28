import { type ForwardedRef, forwardRef, type ReactNode, useImperativeHandle } from "react";
import { Slot } from "@radix-ui/react-slot";
import RmDrawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDrawer } from "./use-drawer";
import type { DrawerRef } from "./types/drawer-ref";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type DrawerProps = {
  children: (closeDrawer: VoidFunction) => ReactNode;
  trigger: ReactNode;
  direction?: "top" | "left" | "right" | "bottom";
  zIndex?: number;
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
};

export const DrawerComponent = (
  {
    children,
    trigger,
    direction = "right",
    zIndex = 1,
    onOpen,
    onClose,
  }: DrawerProps,
  ref: ForwardedRef<DrawerRef>,
) => {
  const { open, close, isOpen } = useDrawer(onOpen, onClose);
  const [drawerSize, setDrawerSize] = useState<string>("100%");

  // Adjust the size based on screen width
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 768) {
        setDrawerSize("70%");
      } else {
        setDrawerSize("100%");
      }
    };

    updateSize(); // Set the initial size
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        close,
        open,
      };
    },
    [close, open],
  );

  return (
    <>
      <RmDrawer
        open={isOpen}
        onClose={close}
        size={drawerSize}
        direction={direction}
        zIndex={9999}
      >
        <div className="p-6 pb-12 h-full overflow-y-auto">
          <div className="ml-auto w-max">
            <X onClick={close} size={20} />
          </div>
          <div className="mt-1 h-full sm:h-auto">{children(close)}</div>
        </div>
      </RmDrawer>
      <Slot onClick={open}>{trigger}</Slot>
    </>
  );
};

export const Drawer = forwardRef(DrawerComponent);

