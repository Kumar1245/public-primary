import "../Assets/Css/globals.css";
import "react-phone-input-2/lib/style.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CommonLayout from "../Layout/CommonLayout";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../lib/react-query-client";
import { AuthProvider } from "../context/AuthContext";
import { GoogleProvider } from "../context/GoogleProvider";
import { SocketProvider } from "../context/SocketContext";
import { FirebaseProvider } from "../firebase/firebase";
import SocketInitializer from "../context/SocketInitializer";
import { Toaster } from "react-hot-toast";
// export default function App({ Component, pageProps }) {
//   const getLayout = Component.getLayout || ((page) => page);
//   const [client] = useState(() => queryClient);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <>
//       <Script
//         src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
//         strategy="beforeInteractive"
//       />
//       <GoogleProvider>
//         <QueryClientProvider client={client}>
//           {/* <FirebaseProvider> */}
//           {/* <SocketProvider> */}
//           {/* <SocketInitializer /> */}

//           <AuthProvider>
//             {loading ? (
//               <Fullpageloader />
//             ) : (
//               <CommonLayout>
//                 {getLayout(<Component {...pageProps} />)}
//               </CommonLayout>
//             )}

//             <ReactQueryDevtools initialIsOpen={false} />
//             <Toaster position="top-center" reverseOrder={false} />
//           </AuthProvider>
//           {/* </SocketProvider> */}
//           {/* </FirebaseProvider> */}
//         </QueryClientProvider>
//       </GoogleProvider>
//     </>
//   );
// }

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const [client] = useState(() => queryClient);

  return (
    <>
      <GoogleProvider>
        <QueryClientProvider client={client}>
          <FirebaseProvider>
            <AuthProvider>
              <CommonLayout>
                {getLayout(<Component {...pageProps} />)}
              </CommonLayout>

              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster position="top-center" />
            </AuthProvider>
          </FirebaseProvider>
        </QueryClientProvider>
      </GoogleProvider>
    </>
  );
}
