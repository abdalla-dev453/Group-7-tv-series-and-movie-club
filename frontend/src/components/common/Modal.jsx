const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal' onClick={(event) => event.stopPropagation()}>
        <div className='modal__header'>
          <h3>{title}</h3>
          <button type='button' onClick={onClose} aria-label='Close modal'>×</button>
        </div>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
