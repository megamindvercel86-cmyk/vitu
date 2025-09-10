"use client";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedConicButton } from "@/components/ui/moving-border";

const SvgButton = ({ button, isWhite = false }: { button: string; isWhite?: boolean }) => {
  const draw = {
    hidden: { pathLength: 0 },
    show: (i: number = 0) => ({
      pathLength: 1,
      transition: { duration: 0.9, ease: "easeInOut", delay: i },
    }),
  };

  const pop = {
    hidden: { opacity: 0, scale: 0.85 },
    show: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut", delay: i },
    }),
  };

  return (
    <>
      {isWhite ? (
        <div className="overflow-hidden flex items-center flex-col">
          {/* Responsive container to fix mobile viewport issues */}
          <div className="w-full flex justify-center overflow-hidden">
            <motion.svg
              className="w-full max-w-[1529px] h-auto"
              viewBox="0 0 1529 202"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <g opacity="0.5">
                {/* Horizontal lines */}
                <motion.line
                  x1="745.207"
                  y1="104.266"
                  x2="0.792969"
                  y2="104.266"
                  stroke="url(#paint0_linear_22_9664)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  custom={0.1}
                />
                <motion.line
                  x1="784.793"
                  y1="104.266"
                  x2="1529.21"
                  y2="104.266"
                  stroke="url(#paint1_linear_22_9664)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  custom={0.25}
                />

                {/* Vertical lines */}
                <motion.line
                  x1="763.539"
                  y1="120.039"
                  x2="763.539"
                  y2="201.727"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  custom={0.4}
                />
                <motion.line
                  x1="763.539"
                  y1="82.3906"
                  x2="763.539"
                  y2="0.703125"
                  stroke="url(#paint2_linear_22_9664)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  custom={0.55}
                />

                {/* Center spokes / shapes */}
                <motion.path
                  d="M749.877 97.019C751.245 94.6018 753.254 92.5932 755.671 91.2249L749.057 88.7709C748.591 88.5979 748.068 88.7125 747.716 89.0639C747.365 89.4153 747.25 89.9392 747.423 90.4051L749.877 97.019Z"
                  fill="white"
                  variants={pop}
                  custom={0.7}
                />
                <motion.path
                  d="M747.905 104.509C747.905 103.091 748.1 101.718 748.464 100.414L742.058 103.353C741.606 103.56 741.316 104.012 741.316 104.509C741.316 105.005 741.606 105.457 742.058 105.664L748.464 108.603C748.101 107.3 747.905 105.926 747.905 104.509Z"
                  fill="white"
                  variants={pop}
                  custom={0.75}
                />
                <motion.path
                  d="M763.161 89.2529C764.579 89.2529 765.952 89.4481 767.255 89.8117L764.316 83.4053C764.109 82.9536 763.658 82.6641 763.161 82.6641C762.664 82.6641 762.212 82.9536 762.005 83.4053L759.066 89.8118C760.37 89.4481 761.743 89.2529 763.161 89.2529Z"
                  fill="white"
                  variants={pop}
                  custom={0.8}
                />
                <motion.path
                  d="M776.446 97.0189L778.9 90.405C779.073 89.9391 778.959 89.4152 778.607 89.0638C778.256 88.7123 777.732 88.5981 777.266 88.7708L770.652 91.2248C773.07 92.5931 775.078 94.6017 776.446 97.0189Z"
                  fill="white"
                  variants={pop}
                  custom={0.85}
                />
                <motion.path
                  d="M763.161 119.762C761.743 119.762 760.37 119.567 759.066 119.203L762.005 125.61C762.212 126.061 762.664 126.351 763.161 126.351C763.658 126.351 764.109 126.061 764.316 125.61L767.255 119.203C765.952 119.567 764.579 119.762 763.161 119.762Z"
                  fill="white"
                  variants={pop}
                  custom={0.9}
                />
                <motion.path
                  d="M749.877 112L747.423 118.614C747.25 119.08 747.365 119.604 747.716 119.955C747.959 120.198 748.284 120.327 748.615 120.327C748.764 120.327 748.913 120.301 749.057 120.248L755.671 117.794C753.254 116.426 751.246 114.417 749.877 112Z"
                  fill="white"
                  variants={pop}
                  custom={0.95}
                />
                <motion.path
                  d="M784.262 103.353L777.855 100.414C778.219 101.718 778.414 103.091 778.414 104.509C778.414 105.926 778.219 107.3 777.855 108.603L784.262 105.664C784.714 105.457 785.003 105.006 785.003 104.509C785.003 104.012 784.714 103.56 784.262 103.353Z"
                  fill="white"
                  variants={pop}
                  custom={1.0}
                />
                <motion.path
                  d="M776.446 112C775.078 114.417 773.07 116.426 770.652 117.794L777.266 120.248C777.41 120.302 777.56 120.327 777.708 120.327C778.04 120.327 778.365 120.198 778.607 119.955C778.959 119.604 779.073 119.08 778.9 118.614L776.446 112Z"
                  fill="white"
                  variants={pop}
                  custom={1.05}
                />

                {/* Center ring */}
                <motion.path
                  d="M763.161 117.221C756.152 117.221 750.449 111.518 750.449 104.509C750.449 97.4994 756.152 91.7969 763.161 91.7969C770.17 91.7969 775.873 97.4994 775.873 104.509C775.873 111.518 770.17 117.221 763.161 117.221Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  variants={draw}
                  custom={1.1}
                />
                <motion.path
                  d="M763.161 117.221C756.152 117.221 750.449 111.518 750.449 104.509C750.449 97.4994 756.152 91.7969 763.161 91.7969C770.17 91.7969 775.873 97.4994 775.873 104.509C775.873 111.518 770.17 117.221 763.161 117.221Z"
                  fill="white"
                  variants={pop}
                  custom={1.25}
                />
              </g>

              <defs>
                <linearGradient id="paint0_linear_22_9664" x1="0.476562" y1="105.539" x2="744.891" y2="105.539" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient id="paint1_linear_22_9664" x1="1528.89" y1="103.539" x2="784.477" y2="103.539" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
                <linearGradient id="paint2_linear_22_9664" x1="764.223" y1="0.976563" x2="764.223" y2="82.6641" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>

          {/* Button below */}
         <div>
            <button className="border rounded-full font-medium font-freightNeoMedium px-16 py-3 text-white border-white">{button}</button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden flex items-center flex-col">
          {/* Responsive container to fix mobile viewport issues */}
          <div className="w-full  justify-center hidden md:flex overflow-hidden">
            <motion.svg
              className="w-full max-w-[1530px] h-auto"
              viewBox="0 0 1530 202"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }} // lowered threshold for mobile
            >
              <g opacity="0.5">
                {/* Horizontal lines */}
                <motion.line
                  x1="745.207"
                  y1="104.266"
                  x2="0.792969"
                  y2="104.266"
                  stroke="url(#paint0_linear_42_104)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  custom={0.1}
                />
                <motion.line
                  x1="784.793"
                  y1="104.266"
                  x2="1529.21"
                  y2="104.266"
                  stroke="url(#paint1_linear_42_104)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  custom={0.25}
                />

                {/* Vertical lines */}
                <motion.line
                  x1="763.539"
                  y1="120.039"
                  x2="763.539"
                  y2="201.727"
                  stroke="#1C1213"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  custom={0.4}
                />
                <motion.line
                  x1="763.539"
                  y1="82.3906"
                  x2="763.539"
                  y2="0.703125"
                  stroke="url(#paint2_linear_42_104)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  custom={0.55}
                />

                {/* Center spokes / shapes */}
                <motion.path
                  d="M750.194 96.7456C751.562 94.3284 753.57 92.3198 755.988 90.9515L749.374 88.4974C748.908 88.3245 748.384 88.4391 748.033 88.7904C747.681 89.1418 747.567 89.6657 747.74 90.1317L750.194 96.7456Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.7}
                />
                <motion.path
                  d="M748.222 104.235C748.222 102.817 748.417 101.444 748.78 100.141L742.374 103.08C741.922 103.287 741.633 103.738 741.633 104.235C741.633 104.732 741.922 105.183 742.374 105.391L748.781 108.33C748.417 107.026 748.222 105.653 748.222 104.235Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.75}
                />
                <motion.path
                  d="M763.477 88.9795C764.895 88.9795 766.268 89.1746 767.572 89.5383L764.633 83.1319C764.426 82.6801 763.974 82.3906 763.477 82.3906C762.98 82.3906 762.529 82.6801 762.322 83.1319L759.383 89.5384C760.686 89.1746 762.059 88.9795 763.477 88.9795Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.8}
                />
                <motion.path
                  d="M776.763 96.7455L779.217 90.1316C779.39 89.6657 779.275 89.1417 778.924 88.7903C778.572 88.4389 778.048 88.3246 777.583 88.4973L770.969 90.9513C773.386 92.3197 775.395 94.3283 776.763 96.7455Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.85}
                />
                <motion.path
                  d="M763.477 119.489C762.059 119.489 760.686 119.293 759.383 118.93L762.322 125.336C762.529 125.788 762.98 126.077 763.477 126.077C763.974 126.077 764.426 125.788 764.633 125.336L767.572 118.93C766.268 119.293 764.895 119.489 763.477 119.489Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.9}
                />
                <motion.path
                  d="M750.194 111.727L747.74 118.34C747.567 118.806 747.681 119.33 748.033 119.682C748.275 119.924 748.6 120.054 748.932 120.054C749.08 120.054 749.23 120.028 749.374 119.975L755.988 117.521C753.57 116.152 751.562 114.144 750.194 111.727Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.95}
                />
                <motion.path
                  d="M784.578 103.08L778.172 100.141C778.536 101.444 778.731 102.817 778.731 104.235C778.731 105.653 778.536 107.026 778.172 108.33L784.578 105.391C785.03 105.184 785.32 104.732 785.32 104.235C785.32 103.738 785.03 103.287 784.578 103.08Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={1.0}
                />
                <motion.path
                  d="M776.763 111.727C775.395 114.144 773.386 116.152 770.969 117.521L777.583 119.975C777.727 120.028 777.876 120.054 778.025 120.054C778.356 120.054 778.681 119.924 778.924 119.682C779.275 119.33 779.39 118.806 779.217 118.34L776.763 111.727Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={1.05}
                />

                {/* Center ring */}
                <motion.path
                  d="M763.478 116.947C756.468 116.947 750.766 111.245 750.766 104.235C750.766 97.226 756.468 91.5234 763.478 91.5234C770.487 91.5234 776.189 97.226 776.189 104.235C776.189 111.245 770.487 116.947 763.478 116.947Z"
                  fill="none"
                  stroke="#1C1213"
                  strokeWidth="2"
                  variants={draw}
                  custom={1.1}
                />
                <motion.path
                  d="M763.478 116.947C756.468 116.947 750.766 111.245 750.766 104.235C750.766 97.226 756.468 91.5234 763.478 91.5234C770.487 91.5234 776.189 97.226 776.189 104.235C776.189 111.245 770.487 116.947 763.478 116.947Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={1.25}
                />
              </g>

              <defs>
                <linearGradient id="paint0_linear_42_104" x1="0.792969" y1="105.266" x2="745.207" y2="105.266" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1C1213" stopOpacity="0" />
                  <stop offset="1" stopColor="#1C1213" />
                </linearGradient>
                <linearGradient id="paint1_linear_42_104" x1="1529.21" y1="103.266" x2="784.793" y2="103.266" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1C1213" stopOpacity="0" />
                  <stop offset="1" stopColor="#1C1213" />
                </linearGradient>
                <linearGradient id="paint2_linear_42_104" x1="764.539" y1="0.703125" x2="764.539" y2="82.3906" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1C1213" stopOpacity="0" />
                  <stop offset="1" stopColor="#1C1213" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
          <div className="w-full flex justify-center overflow-hidden md:hidden ">
            <motion.svg
              width="336"
              height="120"
              viewBox="0 0 336 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <g opacity="0.5">
                {/* All the other lines and spokes remain the same... */}
                <motion.line x1="0.5" y1="61.4258" x2="156.329" y2="61.4258" stroke="url(#paint0_linear_640_150)" variants={draw} custom={0.1} />
                <motion.line x1="335.5" y1="61.8359" x2="179.671" variants={draw} custom={0.25} y2="61.8359" stroke="url(#paint1_linear_640_150)" />
                <motion.line x1="166.933" y1="119.098" x2="166.933" y2="70.931" variants={draw} custom={0.4} stroke="#1C1213" />
                <motion.line
                  x1="166.933"
                  y1="48.7324"
                  variants={draw}
                  custom={0.55}
                  x2="166.933"
                  y2="0.565762"
                  stroke="url(#paint2_linear_640_150)"
                />
                <motion.path
                  d="M159.269 57.1974C160.076 55.7721 161.261 54.5878 162.686 53.781L158.786 52.334C158.511 52.232 158.202 52.2996 157.995 52.5067C157.788 52.7139 157.721 53.0228 157.822 53.2976L159.269 57.1974Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.7}
                />
                <motion.path
                  d="M158.107 61.6125C158.107 60.7765 158.222 59.9668 158.436 59.1982L154.659 60.9311C154.392 61.0533 154.222 61.3195 154.222 61.6125C154.222 61.9055 154.392 62.1717 154.659 62.2939L158.436 64.0268C158.222 63.2582 158.107 62.4486 158.107 61.6125Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.75}
                />
                <motion.path
                  d="M167.102 52.6175C167.938 52.6175 168.748 52.7326 169.516 52.947L167.783 49.1695C167.661 48.9031 167.395 48.7324 167.102 48.7324C166.809 48.7324 166.543 48.9031 166.421 49.1695L164.688 52.9471C165.456 52.7326 166.266 52.6175 167.102 52.6175Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.8}
                />
                <motion.path
                  d="M174.936 57.1974L176.383 53.2975C176.485 53.0228 176.417 52.7139 176.21 52.5067C176.003 52.2994 175.694 52.2321 175.419 52.3339L171.519 53.7809C172.945 54.5877 174.129 55.7721 174.936 57.1974Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.85}
                />
                <motion.path
                  d="M167.102 70.6079C166.266 70.6079 165.456 70.4928 164.688 70.2784L166.421 74.056C166.543 74.3223 166.809 74.493 167.102 74.493C167.395 74.493 167.661 74.3223 167.783 74.0559L169.516 70.2783C168.748 70.4928 167.938 70.6079 167.102 70.6079Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.9}
                />
                <motion.path
                  d="M159.269 66.0312L157.822 69.9311C157.721 70.2058 157.788 70.5148 157.995 70.722C158.138 70.8651 158.33 70.9415 158.525 70.9415C158.613 70.9415 158.701 70.9262 158.786 70.8947L162.686 69.4477C161.261 68.6409 160.076 67.4565 159.269 66.0312Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={0.95}
                />
                <motion.path
                  d="M179.544 60.9312L175.767 59.1982C175.981 59.9669 176.096 60.7765 176.096 61.6125C176.096 62.4486 175.981 63.2582 175.767 64.0268L179.544 62.2939C179.811 62.1718 179.981 61.9056 179.981 61.6126C179.981 61.3196 179.811 61.0534 179.544 60.9312Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={1.0}
                />
                <motion.path
                  d="M174.936 66.0312C174.129 67.4565 172.945 68.6409 171.519 69.4477L175.419 70.8947C175.504 70.9262 175.592 70.9415 175.68 70.9415C175.875 70.9415 176.067 70.865 176.21 70.7219C176.417 70.5147 176.485 70.2058 176.383 69.931L174.936 66.0312Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={1.05}
                />

                {/* === CORRECTED CENTER RING ANIMATION === */}
                {/* 1. Draw the outline */}
                <motion.path
                  d="M167.102 69.1082C162.969 69.1082 159.607 65.7457 159.607 61.6127C159.607 57.4796 162.969 54.1172 167.102 54.1172C171.235 54.1172 174.598 57.4796 174.598 61.6127C174.598 65.7457 171.235 69.1082 167.102 69.1082Z"
                  fill="none"
                  stroke="#1C1213"
                  strokeWidth="2"
                  variants={draw}
                  custom={1.1}
                />
                {/* 2. Pop in the fill */}
                <motion.path
                  d="M167.102 69.1082C162.969 69.1082 159.607 65.7457 159.607 61.6127C159.607 57.4796 162.969 54.1172 167.102 54.1172C171.235 54.1172 174.598 57.4796 174.598 61.6127C174.598 65.7457 171.235 69.1082 167.102 69.1082Z"
                  fill="#1C1213"
                  variants={pop}
                  custom={1.25}
                />
              </g>
              <defs>
                <linearGradient id="paint0_linear_640_150" x1="0.5" y1="62.4258" x2="156.329" y2="62.4258" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1C1213" stopOpacity="0" />
                  <stop offset="1" stopColor="#1C1213" />
                </linearGradient>
                <linearGradient id="paint1_linear_640_150" x1="335.5" y1="60.8359" x2="179.671" y2="60.8359" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1C1213" stopOpacity="0" />
                  <stop offset="1" stopColor="#1C1213" />
                </linearGradient>
                <linearGradient id="paint2_linear_640_150" x1="167.933" y1="0.565762" x2="167.933" y2="48.7324" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1C1213" stopOpacity="0" />
                  <stop offset="1" stopColor="#1C1213" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
          {/* Button below */}
     <div>
            <button
              className={`border rounded-full lg:font-medium lg:font-freightNeoMedium px-16 py-3 ${
                isWhite ? "text-white border-white" : "text-[#1C1213] border-[#1C121380]"
              }`}
            >
              {button}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SvgButton;