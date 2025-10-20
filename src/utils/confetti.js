export const createConfetti = ({ particleCount = 50, spread = 70, origin = { y: 0.6 } } = {}) => {
  const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981']
  
  for (let i = 0; i < particleCount; i++) {
    const confetti = document.createElement('div')
    confetti.style.position = 'fixed'
    confetti.style.width = '10px'
    confetti.style.height = '10px'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.left = `${origin.x || 50}%`
    confetti.style.top = `${(origin.y || 0.6) * 100}%`
    confetti.style.borderRadius = '50%'
    confetti.style.pointerEvents = 'none'
    confetti.style.zIndex = '9999'
    
    const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180)
    const velocity = 3 + Math.random() * 5
    const vx = Math.sin(angle) * velocity
    const vy = -Math.cos(angle) * velocity
    
    document.body.appendChild(confetti)
    
    let x = 0
    let y = 0
    let opacity = 1
    
    const animate = () => {
      y += vy + 0.5
      x += vx
      opacity -= 0.01
      
      confetti.style.transform = `translate(${x}px, ${y}px) rotate(${y * 2}deg)`
      confetti.style.opacity = opacity
      
      if (opacity > 0) {
        requestAnimationFrame(animate)
      } else {
        confetti.remove()
      }
    }
    
    requestAnimationFrame(animate)
  }
}
