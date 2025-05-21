import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { classNames } from "../quartz/util/lang"
import { useState } from "preact/hooks"
import BilingualExplorer from "./BilingualExplorer"

const MobileSidebar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  // Simple toggle function
  const handleToggle = () => {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)
    
    // Toggle body class to prevent scrolling when sidebar is open
    if (newIsOpen) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }
  }
  
  return (
    <div class={classNames(displayClass, "mobile-sidebar-container")}>
      <div class="mobile-header">
        <button 
          class="mobile-sidebar-toggle" 
          onClick={handleToggle}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          type="button"
        >
          <img src="/static/sidebar.png" alt="Menu" class="sidebar-icon" />
        </button>
        <div class="mobile-site-title">
          <span class="english-title">The 2nd Blog</span>
          <span class="chinese-title">第二博客</span>
        </div>
      </div>
      <div class={isOpen ? "mobile-sidebar open" : "mobile-sidebar"}>
        <BilingualExplorer />
      </div>
      {isOpen && (
        <div 
          class="mobile-sidebar-backdrop" 
          onClick={handleToggle}
        ></div>
      )}
    </div>
  )
}

MobileSidebar.css = `
.mobile-sidebar-container {
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
  padding: 0 1rem;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.mobile-site-title {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  margin-left: 1rem;
  line-height: 1.2;
}

.mobile-site-title .english-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--darkgray);
}

.mobile-site-title .chinese-title {
  font-size: 0.75rem;
  color: var(--gray);
}

.mobile-sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.05);
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin: 0;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  position: relative;
  z-index: 1002;
}

.sidebar-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.mobile-sidebar-toggle:hover {
  background: rgba(0,0,0,0.1);
}

.mobile-sidebar-toggle:active {
  background: rgba(0,0,0,0.15);
}

.mobile-sidebar-backdrop {
  display: none;
}

@media all and (max-width: 800px) {
  .mobile-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    height: calc(100vh - 60px);
    width: 85%;
    max-width: 300px;
    background: var(--light);
    padding: 1rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    z-index: 999;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-sidebar.open {
    transform: translateX(0);
  }
  
  .mobile-sidebar-backdrop {
    display: block;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background: rgba(0, 0, 0, 0.4);
    z-index: 998;
  }
  
  body.sidebar-open {
    overflow: hidden;
  }
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
}
`

export default (() => MobileSidebar) satisfies QuartzComponentConstructor 