"use client";

import React, { useEffect, useState } from "react";

type Props = {
  roles?: string[];
  className?: string;
};

export default function Typing({ roles = ["Computer Science", "Web/App Developer", "Freelancer"], className = "" }: Props) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: number;
    const current = roles[roleIndex];

    if (!isDeleting) {
      if (charIndex < current.length) {
        timeout = window.setTimeout(() => setCharIndex((i) => i + 1), 100);
      } else {
        timeout = window.setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = window.setTimeout(() => setCharIndex((i) => i - 1), 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((r) => (r + 1) % roles.length);
        timeout = window.setTimeout(() => {}, 800);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  const current = roles[roleIndex];
  const displayed = current.substring(0, charIndex);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-[3px] bg-[#7cd4ff] ml-1 animate-blink" />
    </span>
  );
}
