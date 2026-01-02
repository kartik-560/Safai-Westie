export default function BackgroundBlobs() {
  return (
    <>
      {/* Purple blob - top right */}
      <div 
        className="fixed -top-[200px] -right-[200px] w-[800px] h-[800px] 
                   rounded-full pointer-events-none opacity-60 -z-10 
                   blur-[120px]
                   bg-[radial-gradient(circle,rgba(108,92,231,0.4)_0%,rgba(108,92,231,0.1)_40%,transparent_70%)]"
      />
      
      {/* Cyan blob - bottom left */}
      <div 
        className="fixed -bottom-[200px] -left-[200px] w-[800px] h-[800px] 
                   rounded-full pointer-events-none opacity-60 -z-10 
                   blur-[120px]
                   bg-[radial-gradient(circle,rgba(0,210,211,0.4)_0%,rgba(0,210,211,0.1)_40%,transparent_70%)]"
      />

      {/* Optional: Center blob for depth */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[600px] h-[600px] rounded-full pointer-events-none 
                   opacity-40 -z-10 blur-[120px]
                   bg-[radial-gradient(circle,rgba(59,130,246,0.3)_0%,rgba(59,130,246,0.1)_40%,transparent_70%)]"
      />
    </>
  )
}
