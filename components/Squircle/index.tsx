import React from 'react';
import { Image, BaseProps } from '@bitrise/bitkit';

interface Props extends BaseProps {
  fatness?: number;
  objectFit?: string;
}

export default ({ objectFit = 'cover', fatness = 0.02, ...props }: Props) => {
  const s = Math.min(Math.max(fatness, 0), 0.5);

  const path = `M .5,0
    C ${s},0 0,${s} 0,.5
    0,${1 - s} ${s},1 .5,1
    ${1 - s},1 1,${1 - s} 1,.5
    1,${s} ${1 - s},0 .5,0
    Z`;
  const id = `squircle-${fatness}`;

  // This is a hacky fix to include -webkit-clip-path for iOS devices
  const styleRef = (node: HTMLImageElement | null) => {
    if (node !== null) {
      const style = node.getAttribute('style');

      if (!style!.includes('-webkit-clip-path')) {
        node.setAttribute('style', `${style} -webkit-clip-path: url("#${id}");`);
      }
    }
  };

  return (
    <div>
      <svg width="0" height="0" style={{ display: 'block' }}>
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={path} />
          </clipPath>
        </defs>
      </svg>

      <Image {...props} style={{ clipPath: `url(#${id})`, objectFit }} innerRef={styleRef} maxWidth="none" />
    </div>
  );
};
