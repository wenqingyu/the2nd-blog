import { FullSlug, resolveRelative } from "../quartz/util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { classNames } from "../quartz/util/lang"

const CustomTagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  if (tags && tags.length > 0) {
    return (
      <div class={classNames(displayClass, "tag-container")}>
        {tags.map((tag) => {
          const linkDest = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)
          return (
            <a href={linkDest} class="tag-link">
              #{tag}
            </a>
          )
        })}
      </div>
    )
  } else {
    return null
  }
}

CustomTagList.css = `
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag-link {
  padding: 0.3rem 0.6rem;
  background-color: var(--hover-bg);
  font-size: 0.8rem;
  transition: all var(--transition-speed) ease;
  text-decoration: none;
}

.tag-link:hover {
  background-color: var(--primary-color);
  color: var(--bg-color);
  text-decoration: none;
}
`

export default (() => CustomTagList) satisfies QuartzComponentConstructor 