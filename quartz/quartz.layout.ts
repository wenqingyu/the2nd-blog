import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import CustomFooter from "./components/CustomFooter"
import BilingualTitle from "./components/BilingualTitle"
import BilingualArticleTitle from "./components/BilingualArticleTitle"
import BilingualExplorer from "./components/BilingualExplorer"
import CustomTagList from "./components/CustomTagList"
import AuthorInfo from "./components/AuthorInfo"
import MobileHeader from "./components/MobileHeader"
import GoogleAnalytics from "./components/GoogleAnalytics"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.MobileOnly(MobileHeader()),
    Component.DesktopOnly(Component.Search()),
  ],
  footer: CustomFooter({
    links: {
      GitHub: "https://github.com/wenqingyu/the2nd-blog",
      About: "#",
    },
  }),
  afterBody: [GoogleAnalytics()],
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    BilingualArticleTitle(),
    AuthorInfo(),
    Component.ContentMeta(),
    CustomTagList()
  ],
  left: [
    Component.DesktopOnly(
      Component.Flex({
        components: [
          {
            Component: BilingualTitle({
              englishTitle: "The 2nd Blog",
              chineseTitle: "第二博客",
              isSiteTitle: true
            }),
          }
        ],
        direction: "column",
        gap: "1rem"
      })
    ),
    Component.DesktopOnly(BilingualExplorer()),
    Component.Flex({
      components: [
        { Component: Component.DesktopOnly(Component.Search()) }
      ],
      direction: "row",
      gap: "0.5rem"
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages (e.g. tags or index)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    Component.DesktopOnly(
      Component.Flex({
        components: [
          {
            Component: BilingualTitle({
              englishTitle: "The 2nd Blog",
              chineseTitle: "第二博客",
              isSiteTitle: true
            }),
          }
        ],
        direction: "column",
        gap: "1rem"
      })
    ),
    Component.DesktopOnly(BilingualExplorer()),
    Component.Flex({
      components: [
        { Component: Component.DesktopOnly(Component.Search()) }
      ],
      direction: "row",
      gap: "0.5rem"
    }),
  ],
  right: [],
}
