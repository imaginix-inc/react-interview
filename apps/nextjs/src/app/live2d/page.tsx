// pages/page.tsx

import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

const Page = () => {
  useEffect(() => {
    // Load scripts that interact with the DOM here
    const scriptUrls = [
      "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
      "https://cdn.jsdelivr.net/npm/pixi.js@6.5.2/dist/browser/pixi.min.js",
      "https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js",
      "https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/extra.min.js",
    ];

    scriptUrls.forEach((url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    });

    // Inline script
    const initScript = document.createElement("script");
    initScript.innerHTML = `
      const cubism4Model = "https://live2d-one.vercel.app/catgirl/catgirl.model3.json"
      const live2d = PIXI.live2d;

      (async function main() {
        const app = new PIXI.Application({
          view: document.getElementById("canvas"),
          autoStart: true,
          resizeTo: window,
          transparent: true
        });

        const models = await Promise.all([
          live2d.Live2DModel.from(cubism4Model)
        ]);

        models.forEach((model) => {
          app.stage.addChild(model);
          // ... rest of your script ...
        });
      })();
    `;
    document.body.appendChild(initScript);

    return () => {
      // Cleanup scripts
      document.querySelectorAll("script").forEach((script) => {
        if (
          scriptUrls.includes(script.src) ||
          script.innerHTML.includes("PIXI")
        ) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Live2D Animation</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js" />
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Page;
