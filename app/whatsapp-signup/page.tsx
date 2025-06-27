"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"

function WhatsappEmbeddedSignupInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Function to initialize and parse
    const initAndParse = () => {
      window.FB.init({
        appId: "4052068368384849",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v19.0",
      });
      window.FB.XFBML.parse();
    };

    // Check if FB SDK is already loaded
    if (window.FB) {
      initAndParse();
    } else {
      // Assign the init function to the global scope
      window.fbAsyncInit = initAndParse;

      // If the script is not already in the DOM, add it
      if (!document.getElementById("facebook-jssdk")) {
        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
      }
    }
  }, []);

  useEffect(() => {
    const accessToken = searchParams.get("access_token")
    if (accessToken) {
      // You now have the access token!
      console.log("WhatsApp access token:", accessToken)
      // You can now send it to your backend or store it as needed
    }
  }, [searchParams])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40}}>
      <style>{`
        .fb-whatsapp-embedded-signup { background-color: 'red',cursor: pointer !important; }
      `}</style>
      <div
        className="fb-whatsapp-embedded-signup"
        data-app-id="4052068368384849"
        data-page-id=""
        data-redirect-uri={typeof window !== "undefined" ? window.location.href : ""}
        data-size="large"
        data-theme="light"
        data-logged-in="true"
        data-allow-logged-in="true"
        data-use-continue-as="true"
        style={{ minWidth: 320, minHeight: 60, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", background: "#000fff", cursor: "pointer" }}
      >FB Business Signup</div>
      <div style={{ marginTop: 24 }}>
        <span style={{ color: '#888', fontSize: 14 }}>
          Need help?&nbsp;
          <a
            href="https://www.facebook.com/business/help/2058515294227817"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#25D366', fontWeight: 'bold', fontSize: 14 }}
          >
            WhatsApp Embedded Signup Documentation
          </a>
        </span>
      </div>
    </div>
  )
}

export default function WhatsappEmbeddedSignup() {
  return (
    <Suspense fallback={null}>
      <WhatsappEmbeddedSignupInner />
    </Suspense>
  )
}
