import React from 'React';

const Modal = props => {
  if (!props.visible) {
    return null;
  }
  return (
    <div className='modal-wrapper'>
      <div className={`modal ${props.className}`}>
        {props.innerHTML}
      </div>
    </div>
  )
}
