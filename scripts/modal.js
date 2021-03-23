export default function Modal({ animateClasses = [] }) {

  const wrapper = document.querySelector('.modal-wrapper');
  const element = document.querySelector('.modal');
  const cancelButton = element.querySelector("footer .button:nth-child(1)")

  cancelButton.addEventListener('click', close)

  function open() {
    document.addEventListener('keydown', closeOnEscape)
    wrapper.classList.add('on')
    element.classList.add(...animateClasses)
  }

  function close() {
    document.removeEventListener('keydown', closeOnEscape)
    wrapper.classList.remove('on')
    element.classList.remove(...animateClasses)
  }

  function closeOnEscape({ key }) {
    if (key == 'Escape') {
      close()
    }
  }

  return  {
    open,
    close
  }

}