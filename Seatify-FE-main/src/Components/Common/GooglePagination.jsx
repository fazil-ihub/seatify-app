import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const GooglePagination = ({ current, total, pageSize, onChange }) => {
    const totalPages = Math.ceil(total / pageSize);

    const getPageNumbers = () => {
        const pages = [];
        const showPages = 5; // Number of page buttons to show
        let start = Math.max(1, current - 2);
        let end = Math.min(totalPages, start + showPages - 1);

        if (end - start + 1 < showPages) {
            start = Math.max(1, end - showPages + 1);
        }

        // Add first page
        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }

        // Add middle pages
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Add last page
        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center gap-1 mt-4">
            <button
                onClick={() => handlePageChange(current - 1)}
                disabled={current === 1}
                className={`px-3 py-1 rounded-lg ${current === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
            >
                <LeftOutlined />
            </button>

            <select
                value={current}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="px-2 py-1 rounded-lg text-gray-600"
            >
                {Array.from({ length: totalPages }, (_, index) => (
                    <option key={index} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </select>

            {/* {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          className={`px-3 py-1 rounded-lg ${
            page === current
              ? 'bg-blue-500 text-white'
              : page === '...'
              ? 'text-gray-600 cursor-default'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </button> */}
            {/* ))} */}

            <button
                onClick={() => handlePageChange(current + 1)}
                disabled={current === totalPages}
                className={`px-3 py-1 rounded-lg ${current === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
            >
                <RightOutlined />
            </button>
        </div>
    );
};

export default GooglePagination; 