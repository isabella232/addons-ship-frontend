export type Props = {
  startColor: string;
  endColor: string;
};

export default ({ startColor, endColor }: Props) => (
  <svg
    viewBox="0 0 862 80"
    style={{
      background: `linear-gradient(90deg, ${startColor}, ${endColor})`
    }}
  >
    <defs>
      <linearGradient x1="96.609239%" y1="49.6431115%" x2="14.0733222%" y2="50.6271256%" id="linearGradient-1">
        <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%"></stop>
        <stop stopColor="#FFFFFF" stopOpacity=".5" offset="64.6547264%"></stop>
        <stop stopColor="#D0FEFF" stopOpacity="0" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="96.609239%" y1="49.381157%" x2="-22.6276744%" y2="52.5123108%" id="linearGradient-2">
        <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%"></stop>
        <stop stopColor="#FFFFFF" stopOpacity=".8" offset="47.0001462%"></stop>
        <stop stopColor="#D0FEFF" stopOpacity="0" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="88.6366729%" y1="49.8847704%" x2="14.0733222%" y2="50.3332489%" id="linearGradient-3">
        <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%"></stop>
        <stop stopColor="#FFFFFF" stopOpacity=".2" offset="52.3083683%"></stop>
        <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g id="1st-Iteration---Without-Testing,-QA,-Dashboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Latest-App-Copy-2" transform="translate(-91.000000, 0.000000)">
        <g id="Group-3">
          <g id="Group-8">
            <g id="Group-6" transform="translate(-15.999624, -6.999236)">
              <path
                d="M881.735481,86.9990641 L210.156384,86.9978664 C218.71153,52.9875994 258.306013,22.8146204 333.594585,9.30207949 C448.470008,-11.3153767 695.406951,42.43158 881.735481,86.9990641 Z"
                id="Combined-Shape"
                fillOpacity="0.5"
                fill="url(#linearGradient-1)"
                opacity="0.430636"
                transform="translate(545.945975, 45.880259) scale(-1, 1) translate(-545.945975, -45.880259) "
              ></path>
              <path
                d="M975.999624,7.00298921 L975.999624,86.9972046 L479.881688,87.0001375 C522.81394,59.2648802 567.029696,31.8415792 610.365803,7.00153703 L975.999624,7.00298921 Z"
                id="Combined-Shape"
                fillOpacity="0.5"
                fill="url(#linearGradient-2)"
                opacity="0.430636"
              ></path>
              <path
                d="M871.7687,87.0029988 L0.532462766,86.9976624 C26.9483975,25.2137692 111.220589,-23.3393292 246.79476,14.1075744 C423.760964,62.9873598 649.806848,31.4599363 798.08942,7.20277579 L963.958206,7.20043089 C965.226263,31.2899681 937.377576,70.049062 871.7687,87.0029988 Z"
                id="Combined-Shape"
                fill="url(#linearGradient-3)"
                transform="translate(482.265999, 44.001117) scale(-1, 1) translate(-482.265999, -44.001117) "
              ></path>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
