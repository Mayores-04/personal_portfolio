"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center p-6 text-sm text-gray-300 bg-transparent">
      <div>© {new Date().getFullYear()} Jake Mayores. All rights reserved.</div>
    </footer>
  );
}
