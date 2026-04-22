import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";

export default function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ NO AUTH CHECK - Works for all users
  useEffect(() => {
    // Only redirect if NO booking data
    if (!state || (!state._id && !state.bookingId)) {
      navigate("/destinations", { replace: true });
    }
  }, [navigate, state]);

  const bookingData = state || {};
  const totalPrice = bookingData.totalPrice || 0;

  if (!bookingData._id && !bookingData.bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking not found</h1>
          <button 
            onClick={() => navigate("/destinations")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* SUCCESS ANIMATION */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl shadow-2xl ring-4 ring-emerald-200/50">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Your adventure to <strong className="text-emerald-700">{bookingData.placeName}</strong> is officially booked! 🎉
          </p>
        </div>

        {/* BOOKING SUMMARY */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* DESTINATION */}
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">📍</span>
              Destination Details
            </h3>
            <div className="space-y-4">
              <div className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                {bookingData.placeName}
              </div>
              <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-4 rounded-2xl">
                <div className="font-mono text-sm text-emerald-800 bg-emerald-200/50 px-4 py-2 rounded-xl inline-block">
                  #{bookingData._id?.slice(-8) || bookingData.bookingId?.slice(-8) || "N/A"}
                </div>
              </div>
              {bookingData.image && (
                <img 
                  src={bookingData.image} 
                  alt={bookingData.placeName}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              )}
            </div>
          </div>

          {/* BOOKING INFO */}
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">📋</span>
              Booking Summary
            </h3>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-semibold">{bookingData.guests}</span>
              </div>
              <div className="flex justify-between text-3xl font-black text-emerald-600 pt-4 border-t border-gray-200">
                <span>Total:</span>
                <span>₹{Number(totalPrice).toLocaleString()}</span>
              </div>
              <div className="text-sm text-green-600 bg-green-100 p-3 rounded-xl mt-4">
                ✅ Payment confirmed • Status: Confirmed
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 px-8 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-2"
          >
            🖨️ Print/Download Receipt
          </button>
          <button
            onClick={() => navigate("/destinations")}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-8 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-lg flex items-center justify-center gap-2"
          >
            🌍 Book Another Adventure
          </button>
        </div>

        {/* INFO */}
        <div className="mt-16 text-center text-sm text-gray-600 max-w-2xl mx-auto space-y-2">
          <p>✅ Your booking is confirmed and secured</p>
          <p>📧 Confirmation email sent (check spam if missing)</p>
          <p>📱 View/manage in your profile dashboard</p>
          <p className="font-semibold text-emerald-700 mt-4">Need help? Contact support@exploreunseen.com</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}