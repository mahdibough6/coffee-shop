import React, { useState } from 'react';

function CertificateForm() {
  const [certificateText, setCertificateText] = useState('');

  const handleCertificateSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('qz-tray-cert', certificateText);
  };

  return (
    <form onSubmit={handleCertificateSubmit}>
      <label htmlFor="certificate">Certificate Text:</label>
      <textarea
        id="certificate"
        name="certificate"
        value={certificateText}
        onChange={(event) => setCertificateText(event.target.value)}
      ></textarea>
      <button type="submit">Save Certificate</button>
    </form>
  );
}

export default CertificateForm;
