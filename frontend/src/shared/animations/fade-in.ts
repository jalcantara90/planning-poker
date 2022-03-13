export const fadeInRight = {
  variants: {
    hidden: { opacity: 0, x: '+50px' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.4,
        duration: 0.5
      }
    }
  },
  initial: 'hidden',
  animate: 'visible'
}

export const fadeInUp = {
  variants: {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: .4 } }
  },
  initial: 'hidden',
  animate: 'visible'
}

export const fadeInStaggerContainer = {
  variants: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: .2
      }
    },
  },
  initial: 'hidden',
  animate: 'visible'
}

export const fadeInDown = {
  variants: {
    hidden: { opacity: 0, y: 200 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: .4
      } 
    }
  },
  initial: 'hidden',
  animate: 'visible'
}