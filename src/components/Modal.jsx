import React from 'react';
import '/src/components/Modal.css';

const Modal = ({ children, open, close }) => {
    const modalClass = `modal ${open ? 'modal-show' : ''} modal-spacing`;
    const handleOutsideClick = (evt) => {
      if (evt.target === evt.currentTarget) close();
    };
  
    return (
      <div
        className={modalClass}
        tabIndex="-1"
        role="dialog"
        onClick={handleOutsideClick}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close-button" aria-label="Close" onClick={close}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Modal;