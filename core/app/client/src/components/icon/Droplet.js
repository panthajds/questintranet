import React from "react";

const Droplet = ({
    style = {},
    fill = "#949698",
    width = "100%",
    className = "",
    viewBox = "0 0 1000 1000"
}) => (
        <svg id="Layer_1" data-name="Layer 1"
        width={width}
        style={style}
        height={width}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill={fill}
        xmlnsXlink="http://www.w3.org/1999/xlink">
            <path fill={fill} d="M148.1,735.27V673.41H71.79v61.86H54.17V599.17H71.79V653.3H148.1V599.17h17.62v136.1Z" />
            <path fill={fill} d="M234.22,735.27V680l-59.89-80.81h22.53L243,661.42l46.1-62.25h22.26L251.84,680v55.29Z" />
            <path fill={fill} d="M319.94,735.27V599.17H405.4q9.94,0,16.56,2.51a24.06,24.06,0,0,1,10.6,7.54,30.42,30.42,0,0,1,5.63,12.57,82.26,82.26,0,0,1,1.66,17.59v57a76.26,76.26,0,0,1-1.66,16.92,28.73,28.73,0,0,1-5.63,12.08,24.79,24.79,0,0,1-10.6,7.35q-6.61,2.5-16.56,2.51Zm102.29-95.89a49.12,49.12,0,0,0-.8-9.67,13.93,13.93,0,0,0-2.71-6.18,10.38,10.38,0,0,0-5.17-3.29,29.18,29.18,0,0,0-8.15-1H337.57v95.89H405.4a29.21,29.21,0,0,0,8.15-1,11.07,11.07,0,0,0,5.17-3.1,12.35,12.35,0,0,0,2.71-5.8,43.66,43.66,0,0,0,.8-9.08Z" />
            <path fill={fill} d="M545.05,735.27l-21.86-60.7H474v60.7H456.41V599.17h79.23a34.09,34.09,0,0,1,13.52,2.41,23.48,23.48,0,0,1,9.07,6.77,27.32,27.32,0,0,1,5.1,10.34A52.08,52.08,0,0,1,564.92,632v9.67q0,13.15-5.29,21.94t-17.76,10.54l22,61.09Zm2.25-103.43q0-12.57-11.66-12.57H474v35.19h61.61q11.67,0,11.66-12.57Z" />
            <path fill={fill} d="M687.08,735.27,639,625.65,590.1,735.27H570.49l62-136.1h12.85L707,735.27Z" />
            <path fill={fill} d="M713.32,735.27v-17.4l94.33-96.66H713.32v-22H838.66v17.4l-94.74,96.66h94.74v22Z" />
            <path fill={fill} d="M852.17,735.27V599.17h95.92v20.1h-78.3v34h74.33v20.11H869.79v41.75h78.3v20.11Z" />
            </svg>
    );

export default Droplet;
