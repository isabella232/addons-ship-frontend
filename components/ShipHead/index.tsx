import Head from 'next/head';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { AppState } from '@/ducks/app';

type Props = {
  app: AppState;
  children: string;
};

export const ShipHead = ({ app, children }: Props) => {
  const title = app ? ` | ${app.title}` : '';
  return (
    <Head>
      <title>
        {children}
        {title}
      </title>
    </Head>
  );
};

const mapStateToProps = ({ app }: RootState) => ({
  app
});

export default connect(mapStateToProps)(ShipHead);
