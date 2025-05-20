import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import CustomFooter from "./components/CustomFooter"
import BilingualTitle from "./components/BilingualTitle"
import BilingualArticleTitle from "./components/BilingualArticleTitle"
import BilingualExplorer from "./components/BilingualExplorer"
import CustomTagList from "./components/CustomTagList"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  footer: CustomFooter({
    links: {
      GitHub: "https://github.com/wenqingyu/the2nd-blog",
      About: "#",
    },
  }),
  afterBody: [],
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    BilingualArticleTitle(),
    Component.ContentMeta(),
    CustomTagList()
  ],
  left: [
    BilingualTitle({
      englishTitle: "The 2nd Blog",
      chineseTitle: "第二博客",
      isSiteTitle: true
    }),
    BilingualExplorer(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages (e.g. tags or index)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    BilingualTitle({
      englishTitle: "The 2nd Blog",
      chineseTitle: "第二博客",
      isSiteTitle: true
    }),
    BilingualExplorer(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [],
}
