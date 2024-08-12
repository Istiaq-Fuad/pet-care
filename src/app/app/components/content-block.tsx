function ContentBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full rounded-md overflow-hidden bg-[#f3f3f3] shadow-sm">
      {children}
    </div>
  );
}

export default ContentBlock;
