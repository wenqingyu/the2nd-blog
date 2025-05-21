import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { classNames } from "../quartz/util/lang"
import { FullSlug, resolveRelative } from "../quartz/util/path"

// Map English category names to Chinese translations
const categoryTranslations: Record<string, string> = {
  "RESEARCH": "研究",
  "2ND-OPINION": "观点",
  "ABOUT": "关于"
}

// Define fixed categories that should always be shown with proper capitalization
const fixedCategories = [
  { slug: "research", displayName: "Research" },
  { slug: "2nd-opinion", displayName: "2nd-Opinion" }
]

// Main component (renamed to MobileHeader since it's no longer a sidebar)
const MobileHeader: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  const currentDir = fileData.slug?.split('/')[0]?.toLowerCase() ?? ''
  
  return (
    <div class={classNames(displayClass, "mobile-header-container")}>
      <div class="mobile-header">
        <a href="/" class="mobile-site-title">
          <span class="english-title">The 2nd Blog</span>
          <span class="chinese-title">第二博客</span>
        </a>
        
        <nav class="mobile-nav">
          <ul class="mobile-categories">
            {fixedCategories.map(folder => {
              const folderDisplayName = folder.displayName.toUpperCase().replace('-', ' ')
              const folderLink = resolveRelative(fileData.slug!, folder.displayName as FullSlug)
              const chineseName = categoryTranslations[folderDisplayName.replace(' ', '-')] || ""
              
              return (
                <li class={folder.slug === currentDir ? "active" : ""}>
                  <a href={folderLink} class="category-link">
                    {folderDisplayName}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

MobileHeader.css = `
.mobile-header-container {
  position: relative;
  width: 100%;
}

.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.mobile-site-title {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  line-height: 1.2;
  color: inherit;
  flex-shrink: 0;
  max-width: 40%;
}

.mobile-site-title .english-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--darkgray);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-site-title .chinese-title {
  font-size: 0.75rem;
  color: var(--gray);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-nav {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
}

.mobile-categories {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.75rem;
}

.mobile-categories li {
  margin: 0;
}

.mobile-categories li a {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 500;
  text-decoration: none;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  color: var(--darkgray);
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

.mobile-categories li.active a {
  background-color: var(--primary-color);
  color: var(--bg-color);
}

@media (prefers-color-scheme: dark) {
  .mobile-header {
    background: var(--dark);
  }
  
  .mobile-site-title .english-title {
    color: var(--light);
  }
  
  .mobile-site-title .chinese-title {
    color: var(--gray);
  }
  
  .mobile-categories li a {
    color: var(--light);
  }
}

@media (max-width: 400px) {
  .mobile-categories li a {
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
  }
  
  .mobile-header {
    padding: 0 0.5rem;
  }
  
  .mobile-categories {
    gap: 0.5rem;
  }
}
`

export default (() => MobileHeader) satisfies QuartzComponentConstructor 