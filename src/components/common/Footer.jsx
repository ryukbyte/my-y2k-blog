
import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#f5dce5] text-[#51434a] py-8 px-6 border-t border-[#d8b1bd]">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-2xl font-serif font-bold text-[#a65e7d] mb-2">
          Lucentcat <span className="text-[#c77f99]">♡</span>
        </h2>

        <p className="text-sm text-[#897780] mb-5">
          A little corner of the internet, made with love.
        </p>

        <div className="flex justify-center items-center gap-3 text-[#c77f99] mb-5">
          <span>✧</span>
          <span>✿</span>
          <span>✧</span>
        </div>

        <div className="border-t border-dashed border-[#d8b1bd] pt-5">
          <p className="text-xs text-[#897780]">
            © {new Date().getFullYear()} Lucentcat. All rights reserved.
          </p>
          <p className="text-xs text-[#b69aa4] mt-2 font-serif italic">
            Stay curious. Keep creating. ♡
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
