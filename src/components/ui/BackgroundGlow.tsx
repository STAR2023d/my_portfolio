function BackgroundGlow() {
  return (
    <>
      <div
        className="
          fixed
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          bg-primary/20
          blur-[140px]
          rounded-full
          pointer-events-none
          z-0
        "
      />

      <div
        className="
          fixed
          bottom-[-250px]
          right-[-200px]
          w-[500px]
          h-[500px]
          bg-blue-500/10
          blur-[160px]
          rounded-full
          pointer-events-none
          z-0
        "
      />
    </>
  );
}

export default BackgroundGlow;