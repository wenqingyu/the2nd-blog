import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { classNames } from "../quartz/util/lang"
import { FullSlug, resolveRelative } from "../quartz/util/path"

interface BilingualTitleProps extends QuartzComponentProps {
  englishTitle?: string
  chineseTitle?: string
  isSiteTitle?: boolean
}

const BilingualTitle: QuartzComponent = ({ 
  displayClass, 
  englishTitle, 
  chineseTitle,
  isSiteTitle = false,
  fileData 
}: BilingualTitleProps) => {
  // If no specific titles are provided, use "The 2nd Blog" and "第二博客"
  const enTitle = englishTitle || "The 2nd Blog"
  const cnTitle = chineseTitle || "第二博客"
  
  const titleClass = isSiteTitle ? "site-title" : "page-title"
  const homeLink = resolveRelative(fileData.slug!, "/" as FullSlug)
  
  return (
    <h1 className={classNames(displayClass, titleClass)}>
      <a href={homeLink} className="title-link">
        {enTitle} <span className="chinese-title">{cnTitle}</span>
      </a>
    </h1>
  )
}

BilingualTitle.css = `
.site-title, .page-title {
  margin: 0;
  font-family: var(--font-family-primary);
}

.site-title {
  font-size: var(--font-size-h1);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.page-title {
  font-size: var(--font-size-h2);
  font-weight: 700;
}

.chinese-title {
  font-size: 0.8em;
  margin-left: 0.5rem;
  opacity: 0.85;
}

.title-link {
  text-decoration: none;
  color: inherit;
}

.title-link:hover {
  text-decoration: none;
  color: var(--primary-color);
}
`

export default ((props?: Partial<BilingualTitleProps>) => {
  const Component: QuartzComponent = (componentProps: QuartzComponentProps) => {
    return BilingualTitle({
      ...props,
      ...componentProps,
    })
  }
  
  Component.css = BilingualTitle.css
  return Component
}) satisfies QuartzComponentConstructor 