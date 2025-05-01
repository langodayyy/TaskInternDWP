import React from 'react';

import { ReactNode } from 'react';


const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8  rounded-lg ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;