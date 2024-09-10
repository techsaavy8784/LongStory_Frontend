/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      phone: "390px", // 375x
      "tablet-portrait": "744px", // 768x
      "tablet-landscape": "1133px", // 768x
      "desktop-1": "1920px", // 1024px
      "desktop-2": "1440px", // 1024px
    },
    extend: {
      width: {
        product: "571px",
        p2: "20%",
        p3: "30%",
        p4: "40%",
        p5: "50%",
        p6: "60%",
        p7: "70%",
        p8: "80%",
        p9: "90%",
        p0: "100%",
      },
      colors: {
        "black-1": "#1F2937",
        "black-2": "#101828",
        "black-3": "#E2E8F0",
        "green-1": "#059669",
        "green-2": "#ECFDF5",
        "blue-1": "#0F172A",
        "gray-1": "#1F2937",
        "gray-2": "#F1F5F9",
        "gray-3": "#CBD5E1",
        "gray-4": "#475569",
        white: "#FFFFFF",
        red: "#E32227",
      },
      spacing: {
        "content-1": "353px",
        "content-2": "112px",
        "content-3": "465px",
        15: "60px",
        25: "100px",
        65: "260px",
        70: "280px",
        90: "360px",
        100: "400px",
        110: "440px",
        134: "536px",
        155: "620px",
        165: "660px",
        170: "680px",
        175: "704px",
        190: "760px",
        200: "800px",
        225: "900px",
        290: "1160px",
        300: "1200px",
      },
      borderRadius: {
        10: "10px",
        14: "14px",
        50: "50px",
      },
      borderWidth: {
        1: "1px",
      },
      fontSize: {
        f16: "16px",
      },
    },
  },
  plugins: [],
};
