import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { MdKeyboardArrowRight } from "react-icons/md";

const CustomBreadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs 
        // maxItems={2} 
        separator={<MdKeyboardArrowRight/>}
        separatorProps={{ 
          style: { 
            margin: '4px',
            color: '#000000' // or any color you prefer
          } 
        }}
        aria-label="breadcrumb"
      >
        {items.map((item, index) => (
          <Link
            key={index}
            underline="none"
            color="inherit"
            href={item.href}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'font-weight 0.2s ease', // Add smooth transition
              '&:hover': {
                fontWeight: 'bold' // Make text bold on hover
              }
            }}
          >
            {/* <span style={{ marginRight: '4px' }}>{item.icon}</span>  */}
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default CustomBreadcrumb;
