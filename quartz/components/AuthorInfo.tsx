import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { classNames } from "../quartz/util/lang"

const AuthorInfo: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const author = fileData.frontmatter?.author as string
  const authorLink = fileData.frontmatter?.author_link as string
  
  if (author) {
    return (
      <div class={classNames(displayClass, "author-info")}>
        By {authorLink ? (
          <a href={authorLink} target="_blank" rel="noopener noreferrer">{author}</a>
        ) : (
          <span>{author}</span>
        )}
      </div>
    )
  } else {
    return null
  }
}

AuthorInfo.css = `
.author-info {
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 0.5rem;
  margin-top: -0.5rem;
}

.author-info a {
  color: var(--secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.author-info a:hover {
  color: var(--tertiary);
  text-decoration: underline;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .author-info {
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }
}

@media (max-width: 480px) {
  .author-info {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
}
`

export default (() => AuthorInfo) satisfies QuartzComponentConstructor 