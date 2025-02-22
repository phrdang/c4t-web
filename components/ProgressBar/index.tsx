import Router from 'next/router'
import NProgress, { NProgressOptions } from 'nprogress'
import * as React from 'react'
import { css, Global } from '@emotion/react'

interface IProgressBarProps {
    options?: Partial<NProgressOptions>;
    color?: string; 
    startPosition?: number;
    stopDelayMs?: number;
    showOnShallow?: boolean;
    height?: number;
}

export default function ProgressBar ({
  color = '#29D',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  showOnShallow = true,
  options,
} : IProgressBarProps) {
  let timer = React.useRef<NodeJS.Timeout | null>(null);

  const routeChangeStart = React.useCallback((
    _ : string,
    {
      shallow
    } : { shallow: boolean }
  ) => {
    if (!shallow || showOnShallow) {
      NProgress.set(startPosition)
      NProgress.start()
    }
  }, [ showOnShallow, startPosition ]);

  const routeChangeEnd = React.useCallback((
    _ : string,
    {
      shallow
    } : { shallow: boolean }
  ) => {
    if (!shallow || showOnShallow) {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        NProgress.done(true)
      }, stopDelayMs)
    }
  }, [ stopDelayMs, showOnShallow ])

  React.useEffect(() => {
    if (options) {
      NProgress.configure(options)
    }
    Router.events.on('routeChangeStart', routeChangeStart)
    Router.events.on('routeChangeComplete', routeChangeEnd)
    Router.events.on('routeChangeError', routeChangeEnd)
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart)
      Router.events.off('routeChangeComplete', routeChangeEnd)
      Router.events.off('routeChangeError', routeChangeEnd)
    }
  }, [ routeChangeStart, routeChangeEnd, options ])

  const style = css`
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      background: ${color};
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      width: 100%;
      height: ${height}px;
    }
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
      opacity: 1;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }
    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border: solid 2px transparent;
      border-top-color: ${color};
      border-left-color: ${color};
      border-radius: 50%;
      -webkit-animation: nprogresss-spinner 400ms linear infinite;
      animation: nprogress-spinner 400ms linear infinite;
    }
    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }
    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }
    @-webkit-keyframes nprogress-spinner {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes nprogress-spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `

  return (
    <>
      <Global styles={style} />
    </>

  )
}