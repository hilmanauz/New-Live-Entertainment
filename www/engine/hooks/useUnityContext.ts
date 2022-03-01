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
        alpha: false,
        antialias: false,
        depth: false,
        failIfMajorPerformanceCaveat: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        stencil: false,
        desynchronized: false,
        xrCompatible: false
      }
    })
  );
  return ref.current;
}