// components/Fullpageloader.jsx

const Fullpageloader = () => {
  return (
    <div className="fullpageloader">
      <div className="loader"></div>
      <style jsx>{`
        /* HTML: <div class="loader"></div> */
        .loader {
          width: 50px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(farthest-side, #1e3a8a 94%, #0000) top/4px
              8px no-repeat,
            conic-gradient(#0000 30%, #1e3a8a);
          -webkit-mask: radial-gradient(
            farthest-side,
            #0000 calc(100% - 4px),
            #000 0
          );
          animation: l13 1s infinite linear;
        }
        @keyframes l13 {
          100% {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </div>
  );
};

export default Fullpageloader;
