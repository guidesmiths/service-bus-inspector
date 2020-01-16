import React, { useState, useEffect } from 'react';
import './Toaster.css';

import { Toast } from 'react-bootstrap';

const Toaster = ({ message, action, resetToaster, toastMessage }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (show === false) {
      resetToaster();
    }
  }, [show, resetToaster]);

  return (
    <div aria-live="polite" aria-atomic="true" className="toast-container">
      <Toast onClose={() => setShow(false)} show={show} delay={6000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{action}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Toaster;
