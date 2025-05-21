import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { classNames } from "../quartz/util/lang"
import { useCallback, useState, useEffect, useRef } from "preact/hooks"
import BilingualExplorer from "./BilingualExplorer"

const MobileSidebar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const toggleSidebar = useCallback((e: MouseEvent) => {
    console.log("Toggle sidebar clicked!")
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(prevState => !prevState)
    
    // Toggle body class to prevent scrolling when sidebar is open
    if (!isOpen) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }
  }, [isOpen])
  
  useEffect(() => {
    console.log("MobileSidebar component mounted")
    
    const button = buttonRef.current
    if (button) {
      // Remove any existing event listeners to avoid duplicates
      button.removeEventListener('click', toggleSidebar as any)
      // Add the event listener directly to the button
      button.addEventListener('click', toggleSidebar as any)
    }
    
    return () => {
      if (button) {
        button.removeEventListener('click', toggleSidebar as any)
      }
    }
  }, [toggleSidebar])
  
  return (
    <div class={classNames(displayClass, "mobile-sidebar-container")}>
      <div class="mobile-header">
        <button 
          ref={buttonRef}
          class="mobile-sidebar-toggle" 
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          type="button"
        >
          <div class="hamburger-menu">
            <span class={isOpen ? "line1 open" : "line1"}></span>
            <span class={isOpen ? "line2 open" : "line2"}></span>
            <span class={isOpen ? "line3 open" : "line3"}></span>
          </div>
        </button>
        <a href="/" class="mobile-site-title">
          <span class="english-title">The 2nd Blog</span>
          <span class="chinese-title">第二博客</span>
        </a>
      </div>
      <div class={isOpen ? "mobile-sidebar open" : "mobile-sidebar"}>
        <BilingualExplorer />
      </div>
      {isOpen && <div class="mobile-sidebar-backdrop" onClick={() => setIsOpen(false)}></div>}
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
  padding: 0.8rem;
  margin: 0;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  position: relative;
  z-index: 1002;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  appearance: none;
}

.mobile-sidebar-toggle:hover {
  background: rgba(0,0,0,0.1);
}

.mobile-sidebar-toggle:active {
  background: rgba(0,0,0,0.15);
}

.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 20px;
  pointer-events: none;
}

.hamburger-menu span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--darkgray);
  border-radius: 3px;
  transition: all 0.3s;
  pointer-events: none;
}

.line1.open {
  transform: rotate(45deg) translate(5px, 5px);
}

.line2.open {
  opacity: 0;
}

.line3.open {
  transform: rotate(-45deg) translate(5px, -5px);
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
  
  .hamburger-menu span {
    background: var(--light);
  }
  
  .mobile-sidebar-toggle {
    background: rgba(255,255,255,0.05);
  }
  
  .mobile-sidebar-toggle:hover {
    background: rgba(255,255,255,0.1);
  }
  
  .mobile-sidebar-toggle:active {
    background: rgba(255,255,255,0.15);
  }
  
  .mobile-sidebar {
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