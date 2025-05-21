import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import CustomFooter from "./components/CustomFooter"
import BilingualTitle from "./components/BilingualTitle"
import BilingualArticleTitle from "./components/BilingualArticleTitle"
import BilingualExplorer from "./components/BilingualExplorer"
import CustomTagList from "./components/CustomTagList"
import AuthorInfo from "./components/AuthorInfo"
import MobileSidebar from "./components/MobileSidebar"
import GoogleAnalytics from "./components/GoogleAnalytics"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.MobileOnly(Component.Spacer()),
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
      BilingualTitle({
        englishTitle: "The 2nd Blog",
        chineseTitle: "第二博客",
        isSiteTitle: true
      })
    ),
    Component.DesktopOnly(BilingualExplorer()),
    Component.MobileOnly(
      MobileSidebar()
    ),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Search()),
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
    Component.DesktopOnly(
      BilingualTitle({
        englishTitle: "The 2nd Blog",
        chineseTitle: "第二博客",
        isSiteTitle: true
      })
    ),
    Component.DesktopOnly(BilingualExplorer()),
    Component.MobileOnly(
      MobileSidebar()
    ),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Search()),
  ],
  right: [],
}
