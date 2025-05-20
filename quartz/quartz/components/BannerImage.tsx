import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const BannerImage: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  // Check if the post has a banner image in frontmatter
  const banner = fileData.frontmatter?.banner
  const title = fileData.frontmatter?.title || "Post"
  
  // Use the specified banner or default to post.png
  const bannerSrc = banner ? String(banner) : "/static/img/post.png"
  
  return (
    <div class={classNames(displayClass, "banner-image-container")}>
      <img 
        src={bannerSrc} 
        alt={`Banner image for ${title}`} 
        class="banner-image"
      />
    </div>
  )
}

BannerImage.css = `
.banner-image-container {
  width: 100%;
  margin-bottom: 2rem;
  overflow: hidden;
  max-height: 400px;
}

.banner-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 0;
  aspect-ratio: 21/9;
  transition: transform var(--transition-speed, 0.2s) ease;
}

.banner-image:hover {
  transform: scale(var(--scale-hover, 1.03));
}
`

export default (() => BannerImage) satisfies QuartzComponentConstructor 