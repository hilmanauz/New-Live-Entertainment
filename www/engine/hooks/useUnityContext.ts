import React from "react";
import { UnityContext } from "react-unity-webgl";

const buildUrl = "Build";

export default function useUnityContext() {
  const ref = React.useRef(
    new UnityContext({
      loaderUrl: buildUrl + "/everidea-interactive.github.io.loader.js",
      dataUrl: buildUrl + "/everidea-interactive.github.io.data",
      frameworkUrl: buildUrl + "/everidea-interactive.github.io.framework.js",
      codeUrl: buildUrl + "/everidea-interactive.github.io.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "My project",
      productVersion: "0.1",
      webglContextAttributes: {
        powerPreference: "high-performance",
        alpha: true,
        antialias: true,
        depth: true,
        failIfMajorPerformanceCaveat: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: true,
        stencil: true,
        desynchronized: true,
        xrCompatible: true
      }
    })
  );
  return ref.current;
}