import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { classNames } from "../quartz/util/lang"

const BilingualArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title as string
  const chineseTitle = fileData.frontmatter?.chineseTitle as string
  const tags = fileData.frontmatter?.tags as string[] || []
  const isChinesePost = tags.includes('中文')
  
  if (title) {
    return (
      <h1 class={classNames(displayClass, "article-title")}>
        {isChinesePost ? chineseTitle : title}
      </h1>
    )
  } else {
    return null
  }
}

BilingualArticleTitle.css = `
.article-title {
  margin: 2rem 0 1rem 0;
  font-family: var(--font-family-primary);
  font-size: 2rem;
  font-weight: normal;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: var(--text-color);
}

.chinese-title {
  font-size: 0.8em;
  margin-left: 0.5rem;
  opacity: 0.85;
  display: block;
  font-weight: normal;
}
`

export default (() => BilingualArticleTitle) satisfies QuartzComponentConstructor 