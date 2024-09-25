"use client";

import React from 'react';

function PageView({trans} : {trans : any}) {
  return (
      <div>
        {JSON.stringify(trans)}
      </div>
  );
}

export default PageView;
