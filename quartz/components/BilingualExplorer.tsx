import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { classNames } from "../quartz/util/lang"
import { FullSlug, resolveRelative } from "../quartz/util/path"
import explorerStyle from "../quartz/components/styles/explorer.scss"

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

const BilingualExplorer: QuartzComponent = ({ displayClass, allFiles, fileData }: QuartzComponentProps) => {
  // Create a mapping of folders to files
  const foldersByName: Record<string, string[]> = {}
  
  // Initialize with fixed categories
  fixedCategories.forEach(category => {
    foldersByName[category.slug] = []
  })
  
  // Add files to categories
  allFiles.forEach(file => {
    if (!file.slug) return
    
    // Extract the top-level folder from the slug
    const parts = file.slug.split('/')
    if (parts.length > 0) {
      const folder = parts[0].toLowerCase()
      if (!foldersByName[folder]) {
        foldersByName[folder] = []
      }
      foldersByName[folder].push(file.slug)
    }
  })
  
  const currentDir = fileData.slug?.split('/')[0]?.toLowerCase() ?? ''
  
  return (
    <div class={classNames(displayClass, "explorer")}>
      <ul class="folder-list">
        {fixedCategories.map(folder => {
          const folderDisplayName = folder.displayName.toUpperCase().replace('-', ' ')
          // Use the properly capitalized displayName for the link
          const folderLink = resolveRelative(fileData.slug!, folder.displayName as FullSlug)
          const chineseName = categoryTranslations[folderDisplayName.replace(' ', '-')] || ""
          
          return (
            <li class={folder.slug === currentDir ? "active" : ""}>
              <div class="folder-container">
                <a href={folderLink} class="folder-title">
                  {folderDisplayName} <span class="chinese-category">{chineseName}</span>
                </a>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

BilingualExplorer.css = `
${explorerStyle}

.folder-list {
  list-style: none;
  padding: 0;
  margin: 0.8rem 0;
}

.folder-list li {
  margin-bottom: 0.5rem;
}

.folder-container {
  padding: 0.4rem 0.8rem;
  background-color: var(--hover-bg);
  transition: all var(--transition-speed) ease;
}

.folder-container:hover {
  background-color: var(--primary-color);
}

.folder-container:hover .folder-title {
  color: var(--bg-color);
}

.folder-container:hover .chinese-category {
  color: var(--bg-color);
}

.folder-title {
  font-family: var(--font-family-primary);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  text-decoration: none;
}

.chinese-category {
  font-size: 0.8em;
  opacity: 0.85;
  margin-left: 0.3rem;
}

.active .folder-container {
  background-color: var(--primary-color);
}

.active .folder-title {
  color: var(--bg-color);
}

.active .chinese-category {
  color: var(--bg-color);
}
`

export default (() => BilingualExplorer) satisfies QuartzComponentConstructor 