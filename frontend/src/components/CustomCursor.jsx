import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const outlinePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let rafId = null

    function onMouseMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    }

    function animate() {
      const dx = posRef.current.x - outlinePosRef.current.x
      const dy = posRef.current.y - outlinePosRef.current.y
      
      outlinePosRef.current.x += dx * 0.15
      outlinePosRef.current.y += dy * 0.15
      
      outline.style.left = `${outlinePosRef.current.x}px`
      outline.style.top = `${outlinePosRef.current.y}px`
      
      rafId = requestAnimationFrame(animate)
    }

    function onMouseEnterInteractive() {
      outline.classList.add('hover')
    }

    function onMouseLeaveInteractive() {
      outline.classList.remove('hover')
    }

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
    
    document.addEventListener('mousemove', onMouseMove)
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })
    
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
      })
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  )
}

