"use client";

import useMediaQuery from "./useWindowsize";

const MediaRendering = ({
  minWidth,
  maxWidth,
  children,
}: {
  minWidth: string | null;
  maxWidth: string | null;
  children: React.ReactNode;
}) => {
  const minDeviceSize = useMediaQuery(`(min-width: ${minWidth}px)`);
  const maxDeviceSize = useMediaQuery(`(max-width: ${maxWidth}px)`);

  return <>{(maxDeviceSize || minDeviceSize) && children}</>;
};

export default MediaRendering;
