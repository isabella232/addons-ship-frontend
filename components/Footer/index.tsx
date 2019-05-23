import SVG from 'react-svg';
import css from './style.scss';

export default () => (
  <div className={css.footer}>
    <SVG src="/static/icon-bitrise-notext.svg" className={css.icon} />
    <div className={css.text}>Ship</div>
    <div className={css.text}>An official Bitrise add-on</div>
  </div>
);
