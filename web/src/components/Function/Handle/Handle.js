export const handleMouseEnter = (i) => {
  setTimeout(() => {
    btnRefs.current[i].classList.add('hovered')
  }, 500)
}
export const handleMouseLeave = (i) => {
  setTimeout(() => {
    btnRefs.current[i].classList.remove('hovered')
  }, 600)
}
export const handleModal = () => {
  setOpened(false)
}
