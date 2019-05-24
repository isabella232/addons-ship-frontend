import { Fragment } from 'react';

type Props = {
  devices: any[];
};

export default ({ devices }: Props) => (
  <Fragment>
    {devices.map((device, idx) => (
      <h1 key={idx}>{device}</h1>
    ))}
  </Fragment>
);
