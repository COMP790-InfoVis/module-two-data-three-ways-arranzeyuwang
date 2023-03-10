/* eslint-disable react-hooks/rules-of-hooks */

/**
 * Modified from D3 gallery - react hooks at
 * https://observablehq.com/@jerstucki/react-hooks-and-d3
 */

import React, { useRef, useEffect } from "react";
import debounce from "lodash/debounce";

export default function d3Adaptor(
  renderFn: (w: number, h: number) => void,
  dependencies: React.DependencyList
) {
  const ref = useRef() as any;

  useEffect(() => {
    let { width: w, height: h } = ref.current.getBoundingClientRect();

    renderFn(w, h);
  }, dependencies);

  useEffect(() => {
    let repaint = debounce(() => {
      let { width: w, height: h } = ref.current.getBoundingClientRect();

      renderFn(w, h);
    }, 300);

    window.addEventListener("resize", repaint);

    return () => {
      window.removeEventListener("resize", repaint);
    };
  }, []);

  return ref;
}
