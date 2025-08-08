"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, Download } from 'lucide-react'

interface EmailCaptureProps {
  emailSubmitted: boolean
  handleEmailSignup: (e: React.FormEvent<HTMLFormElement>) => void
  handlePurchase: () => void
}

export function EmailCapture({ emailSubmitted, handleEmailSignup, handlePurchase }: EmailCaptureProps) {
  const [showMailerLiteForm, setShowMailerLiteForm] = useState(false)

  const safeTrackEvent = (eventName: string, eventData: any) => {
    try {
      if (typeof window !== "undefined" && window.trackEvent) {
        window.trackEvent(eventName, eventData)
      }
    } catch (error) {
      console.log("Tracking error (non-critical):", error)
    }
  }

    // Lazily load the MailerLite CSS and scripts when the form is shown.
  useEffect(() => {
    // If the form isn't visible yet, don't load the MailerLite assets. This
    // prevents a large CSS block and external scripts from blocking the
    // initial render and speeds up page load.
    if (!showMailerLiteForm) return

    // Load MailerLite styles and scripts
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerHTML = `
      @import url("https://assets.mlcdn.com/fonts.css?version=1754483");
      
      /* LOADER */
      .ml-form-embedSubmitLoad {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
      .g-recaptcha {
        transform: scale(1);
        -webkit-transform: scale(1);
        transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        height: ;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
      }
      .ml-form-embedSubmitLoad:after {
        content: " ";
        display: block;
        width: 11px;
        height: 11px;
        margin: 1px;
        border-radius: 50%;
        border: 4px solid #fff;
        border-color: #ffffff #ffffff #ffffff transparent;
        animation: ml-form-embedSubmitLoad 1.2s linear infinite;
      }
      @keyframes ml-form-embedSubmitLoad {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      
      #mlb2-29297354.ml-form-embedContainer {
        box-sizing: border-box;
        display: table;
        margin: 0 auto;
        position: static;
        width: 100% !important;
      }
      #mlb2-29297354.ml-form-embedContainer h4,
      #mlb2-29297354.ml-form-embedContainer p,
      #mlb2-29297354.ml-form-embedContainer span,
      #mlb2-29297354.ml-form-embedContainer button {
        text-transform: none !important;
        letter-spacing: normal !important;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper {
        background-color: transparent;
        border-width: 0px;
        border-color: transparent;
        border-radius: 4px;
        border-style: solid;
        box-sizing: border-box;
        display: inline-block !important;
        margin: 0;
        padding: 0;
        position: relative;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper.embedPopup,
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper.embedDefault { 
        width: 400px; 
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper.embedForm { 
        max-width: 400px; 
        width: 100%; 
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-align-center { 
        text-align: center; 
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
        padding: 20px 20px 0 20px;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4 {
        color: #ffffff;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 30px;
        font-weight: 700;
        margin: 0 0 10px 0;
        text-align: center;
        word-break: break-word;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p {
        color: #ffffff;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        margin: 0 0 20px 0;
        text-align: center;
        opacity: 0.9;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
        background-color: #ffffff !important;
        color: #333333 !important;
        border-color: #ffffff;
        border-radius: 12px !important;
        border-style: solid !important;
        border-width: 2px !important;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 16px !important;
        height: 56px;
        line-height: 21px !important;
        margin-bottom: 0;
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
        padding: 16px 20px !important;
        width: 100% !important;
        box-sizing: border-box !important;
        max-width: 100% !important;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:focus {
        border-color: #fbbf24 !important;
        outline: none;
        box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.3);
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::placeholder {
        color: #666666;
        opacity: 1;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
        background-color: #fbbf24 !important;
        border: none !important;
        border-radius: 12px !important;
        box-shadow: none !important;
        color: #2C5F41 !important;
        cursor: pointer;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
        font-size: 18px !important;
        font-weight: 700 !important;
        line-height: 21px !important;
        height: 56px;
        padding: 16px 20px !important;
        width: 100% !important;
        box-sizing: border-box !important;
        transition: all 0.2s ease;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
        background-color: #f59e0b !important;
        transform: translateY(-1px);
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading {
        display: none;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 {
        color: #fbbf24;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 10px 0;
        text-align: center;
      }
      #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p {
        color: #ffffff;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        margin: 0 0 20px 0;
        text-align: center;
        opacity: 0.9;
      }
      .ml-form-formContent {
        margin: 0 0 20px 0;
      }
      .ml-form-fieldRow {
        margin: 0 0 15px 0;
      }
      .ml-form-embedSubmit {
        margin: 0 0 20px 0;
      }
      
      @media only screen and (max-width: 400px) {
        #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper.embedDefault, 
        #mlb2-29297354.ml-form-embedContainer .ml-form-embedWrapper.embedPopup { 
          width: 100%!important; 
        }
      }
    `
    document.head.appendChild(styleSheet)

    // Load MailerLite script
    const script = document.createElement("script")
    script.src = "https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024"
    script.type = "text/javascript"
    script.async = true
    document.head.appendChild(script)

    // Load tracking script
    const trackingScript = document.createElement("script")
    trackingScript.innerHTML = `
      fetch("https://assets.mailerlite.com/jsonp/1718486/forms/161998302188930178/takel")
    `
    document.head.appendChild(trackingScript)

    // Define success callback
    window.ml_webform_success_29297354 = function() {
      console.log("MailerLite form submitted successfully")
      safeTrackEvent("email_captured", {
        event_category: "Lead Generation",
        event_label: "Free Chapter Download Success (MailerLite)",
        value: 10,
      })
      handleEmailSignup({ preventDefault: () => {} } as any)
    }

    return () => {
      // Cleanup
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet)
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      if (trackingScript.parentNode) {
        trackingScript.parentNode.removeChild(trackingScript)
      }
    }
    }, [showMailerLiteForm, handleEmailSignup, safeTrackEvent])

  const handleShowForm = () => {
    setShowMailerLiteForm(true)
    safeTrackEvent("email_capture_attempt", {
      event_category: "Lead Generation",
      event_label: "Free Chapter Download",
      value: 5,
    })
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-[#4A9B5E] to-[#2C5F41] text-white">
      <div className="container max-w-4xl px-4">
        {!emailSubmitted ? (
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">🎁 Get a Free Sample Chapter Before You Buy</h2>
              <p className="text-lg md:text-xl mb-2 opacity-95">
                <strong>"How to Heal from Tears, Episiotomy, or C-Section Without Using Harsh Chemicals"</strong>
              </p>
              <p className="text-base opacity-90">The #1 most requested topic from new moms (normally $12 value)</p>
            </div>

            <div className="max-w-md mx-auto">
              {!showMailerLiteForm ? (
                <div className="space-y-4">
                  <Button
                    onClick={handleShowForm}
                    className="w-full bg-yellow-400 text-[#2C5F41] hover:bg-yellow-300 h-14 text-lg font-bold rounded-xl transition-all duration-200"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download className="h-5 w-5" />
                      Get My Free Chapter Now
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="mailerlite-form-container">
                  <div id="mlb2-29297354" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-29297354">
                    <div className="ml-form-align-center">
                      <div className="ml-form-embedWrapper embedForm">
                        <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                          <div className="ml-form-embedContent">
                            <h4>Free Chapter</h4>
                            <p>Get a free chapter sent to your email!</p>
                          </div>
                          <form 
                            className="ml-block-form" 
                            action="https://assets.mailerlite.com/jsonp/1718486/forms/161998302188930178/subscribe" 
                            data-code="" 
                            method="post" 
                            target="_blank"
                          >
                            <div className="ml-form-formContent">
                              <div className="ml-form-fieldRow ml-last-item">
                                <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                                  <input 
                                    aria-label="email" 
                                    aria-required="true" 
                                    type="email" 
                                    className="form-control" 
                                    data-inputmask="" 
                                    name="fields[email]" 
                                    placeholder="Enter your email address" 
                                    autocomplete="email"
                                  />
                                </div>
                              </div>
                            </div>
                            <input type="hidden" name="ml-submit" value="1" />
                            <div className="ml-form-embedSubmit">
                              <button type="submit" className="primary">
                                <Download className="inline-block mr-2 h-5 w-5" />
                                Yes, Send My Free Chapter!
                              </button>
                              <button disabled style={{ display: 'none' }} type="button" className="loading">
                                <div className="ml-form-embedSubmitLoad"></div>
                                <span className="sr-only">Loading...</span>
                              </button>
                            </div>
                            <input type="hidden" name="anticsrf" value="true" />
                          </form>
                        </div>
                        <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                          <div className="ml-form-successContent">
                            <h4>Thank you!</h4>
                            <p>You have successfully joined our subscriber list.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-center gap-2 text-sm opacity-80">
                <Shield className="h-4 w-4" />
                <span>No spam, ever. Unsubscribe anytime. We respect your privacy.</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-lg mb-4 opacity-95">Want the complete guide with all 20 answers?</p>
              <Button
                onClick={handlePurchase}
                className="bg-white text-[#4A9B5E] hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                Get Full Guide Now - $19
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-2xl mx-auto">
            <CheckCircle className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Check Your Email!</h2>
            <p className="text-lg mb-8 opacity-95">
              Your free chapter is on its way. While you wait, get the complete guide with all 20 answers:
            </p>
            <Button
              onClick={handlePurchase}
              className="bg-yellow-400 text-[#2C5F41] hover:bg-yellow-300 h-14 text-lg font-bold px-8 rounded-xl"
            >
              Get the Complete Guide - Just $19
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
