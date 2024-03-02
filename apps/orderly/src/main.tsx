import React from 'react';
import { createRoot } from 'react-dom/client';
import { Orderly } from '@shell-orderly';
import './main.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Orderly />
  </React.StrictMode>
);
