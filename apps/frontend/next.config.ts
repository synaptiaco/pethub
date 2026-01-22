import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts", // Donde vivirá la lógica del Service Worker
  swDest: "public/sw.js",
});

export default withSerwist({
  reactCompiler:true
});