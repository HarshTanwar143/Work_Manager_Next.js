import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between shadow-[0px_10px_30px_5px_rgba(128,0,255,0.6)] px-6 py-10 md:py-16 min-h-[60vh] w-full">
      <div className='w-full md:w-[45%] flex flex-col items-center gap-4 text-center px-4'>
        <h1 className='uppercase font-bold text-xl md:text-2xl'>Stay Organized, Stay Productive!</h1>
        <p className='italic text-sm md:text-base'>
          Work Manager helps you streamline your tasks, track progress, and manage your workflow effortlessly. 
          Designed for efficiency, our platform ensures that you never miss a deadline.
        </p>
        <b className='text-xs md:text-sm'><i>© 2024 Work Manager. All rights reserved.</i></b>
      </div>
      
      <div className="flex flex-col items-center w-full md:w-[30%] p-4 mt-8 md:mt-0">
        <b className="text-lg mb-6 md:mb-10"><i>IMPORTANT LINKS</i></b>
        <ul className="list-none flex flex-wrap justify-center text-center gap-4 md:gap-6">
          <li className="min-w-[80px] md:min-w-[100px] hover:text-violet-800 transition-colors duration-200"><a href='https://leetcode.com/u/Harsh_tanwar65/' target='_blank'>Leetcode</a></li>
          <li className="min-w-[80px] md:min-w-[100px] hover:text-violet-800 transition-colors duration-200"><a href='https://www.geeksforgeeks.org/user/harshtanwar14/' target='_blank'>GFG</a></li>
          <li className="min-w-[80px] md:min-w-[100px] hover:text-violet-800 transition-colors duration-200"><a href='https://www.linkedin.com/in/harsh-tanwar-04315b247/' target="_blank">LinkedIn</a></li>
          <li className="min-w-[80px] md:min-w-[100px] hover:text-violet-800 transition-colors duration-200"><a href='https://github.com/HarshTanwar143' target='_blank'>GitHub</a></li>
          <li className="min-w-[80px] md:min-w-[100px] hover:text-violet-800 transition-colors duration-200"><a href='https://www.codechef.com/users/harsh65' target='_blank'>CodeChef</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
