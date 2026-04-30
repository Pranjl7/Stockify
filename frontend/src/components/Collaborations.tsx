import React from 'react';
import { href } from 'react-router-dom';

function Collaborations() {
  const icons = [
    {
      href: '../assets/microsoft.svg',
      alt: 'microsoft',
    },
    {
      href: '../assets/google.svg',
      alt: 'google',
    },
    {
      href: '../assets/slack.svg',
      alt: 'slack',
    },
    {
      href: '../assets/teradata.svg',
      alt: 'teradata',
    },
    {
      href: '../assets/salesforce.svg',
      alt: 'salesforce',
    },
  ];
  return (
    <div className="w-full px-30 flex items-center justify-around mt-5 mask-fade-x overflow-hidden">
      {icons.map((icon, index) => (
        <img key={index} src={icon.href} alt={icon.title} className="size-25 opacity-80" />
      ))}
    </div>
  );
}

export default Collaborations;
