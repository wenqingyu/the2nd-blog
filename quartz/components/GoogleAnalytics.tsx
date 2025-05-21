import { QuartzComponent, QuartzComponentConstructor } from "../quartz/components/types"

const MEASUREMENT_ID = 'G-55PQ4GX9BM'

const GoogleAnalytics: QuartzComponent = () => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}

export default (() => GoogleAnalytics) satisfies QuartzComponentConstructor 