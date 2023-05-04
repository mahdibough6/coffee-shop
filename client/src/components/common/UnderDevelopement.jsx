import React from 'react';

const UnderDevelopment = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center m-4">
        <h1 className="text-2xl font-bold mb-4">Application Web en Développement</h1>
        <p className="text-gray-700">
          Nous nous excusons pour le désagrément, mais notre application Web n'est actuellement pas disponible sur les téléphones. Nous travaillons activement à développer une version mobile, qui sera disponible prochainement.
        </p>
        <div className="mt-6">
          <p className="text-sm text-gray-500">Merci de votre compréhension et de votre patience.</p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
