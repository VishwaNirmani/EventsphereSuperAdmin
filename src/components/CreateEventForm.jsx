import { AdvancedMarker, APIProvider, Map, Marker, Pin } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getConnectedAccounts } from "../services/PaymentService";
import { createEvent, updateEvent } from "../services/EventService";

const CreateEventForm = ({ onCancel, event, isUpdate = false }) => {

  const eventTypes = [
    "Music",
    "Art",
    "Tech",
    "Sport",
    "Business",
    "Health",
    "Education",
    "Fashion",
    "Food",
    "Other",
    "Travel & Adventure",
    "Science & Innovation",
    "Film & Entertainment",
    "Gaming & Esports",
    "Literature & Books",
    "Politics & Government",
    "Religion & Spirituality",
    "Charity & Non-Profit",
    "Environment & Sustainability",
    "Networking & Meetups",
    "Workshops & Training",
    "Festivals & Cultural",
    "Family & Kids",
    "Comedy & Theater",
    "History & Heritage"
  ];

  const [eventName, setEventName] = useState(isUpdate ? event.title : "");
  const [eventType, setEventType] = useState(isUpdate ? event.type : "");
  const [eventDateTime, setEventDateTime] = useState(isUpdate ? event.eventDate : "");
  const [bookingRequired, setBookingRequired] = useState(isUpdate ? event.bookingRequired : false);
  const [address, setAddress] = useState(isUpdate ? event.address : "");
  const [latitude, setLatitude] = useState(isUpdate ? event.lat : 0);
  const [longitude, setLongitude] = useState(isUpdate ? event.lng : 0);
  const [seats, setSeats] = useState(isUpdate ? event.seats : "");
  const [price, setPrice] = useState(isUpdate ? event.price : "");
  const [mainPhoto, setMainPhoto] = useState(null);
  const [otherPhotos, setOtherPhotos] = useState([]);
  const [existingMainPhoto, setExistingMainPhoto] = useState(
    isUpdate ? event.mainPhoto : null
  );
  const [existingOtherPhotos, setExistingOtherPhotos] = useState(
    isUpdate ? event.otherPhotos || [] : []
  );
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [paymentAccountActivated, setPaymentAccountActivatedStatus] = useState(false);

  useEffect(() => {
    getConnectedAccounts().then(res => {
      if (res.success) {
        if (res.data != null && res.data.status === "ACTIVE") {
          setPaymentAccountActivatedStatus(true);
        }
      }
    });
  }, []);

  const handleMainPhotoChange = (e) => setMainPhoto(e.target.files[0]);
  const handleOtherPhotosChange = (e) => setOtherPhotos([...e.target.files]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setError("Please fill required fields");
      return;
    }

    const formData = new FormData();

    if (isUpdate) {
      formData.append("id", event.eventId);
    }

    formData.append("title", eventName);
    formData.append("type", eventType);
    formData.append("eventDate", eventDateTime);
    formData.append("bookingRequired", bookingRequired);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    if (bookingRequired) {
      formData.append("seats", seats);
      formData.append("price", price);
    }

    if (mainPhoto) {
      formData.append("mainPhoto", mainPhoto);
    } else if (isUpdate && existingMainPhoto) {
      formData.append("mainPhotoUrl", existingMainPhoto);
    }

    if (otherPhotos.length > 0) {
      otherPhotos.forEach((photo) => formData.append("otherPhotos", photo));
    } else if (isUpdate && existingOtherPhotos.length > 0) {
      existingOtherPhotos.forEach((photo) => formData.append("otherPhotoUrls", photo));
    }

    console.log("Submitting payload:");
    for (let [key, value] of formData.entries()) console.log(key, value);

    setSubmitting(true);
    setError("");

    if (isUpdate) {

      updateEvent(formData).then((res) => {
        setSubmitting(false);
        if (res.success) {
          onCancel();
          window.location.reload();
        } else {
          setError(res.message);
        }
      });

      return;
    }

    createEvent(formData).then((res) => {
      setSubmitting(false);
      if (res.success) {
        onCancel();
        window.location.reload();
      } else {
        setError(res.message);
      }
    });

  };

  const validateFields = () => {
    if (eventName == "" || eventType == "" || eventDateTime == "" || (mainPhoto == null && existingMainPhoto == null)) {
      return false;
    }

    return true;
  }

  const googleMapView = () => {
    return (
      <APIProvider apiKey="AIzaSyCYVq4xnSaaAjKp-R8mcr5esl4hRlTQSeE">
        <Map
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          onClick={(evt) => {
            setLatitude(evt.detail.latLng.lat);
            setLongitude(evt.detail.latLng.lng);
            console.log("clicked " + evt.detail.latLng);
          }}
        >
          {
            (longitude != 0 && latitude != 0) &&
            <Marker position={{ lat: latitude, lng: longitude }} />
          }
        </Map>
      </APIProvider>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 w-full max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
        {isUpdate ? 'Update Event' : 'Create Event'}
      </h2>

      {/* Event Name & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-medium text-gray-700">Event Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="font-medium text-gray-700">Event Type <span className="text-red-500">*</span></label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring focus:ring-indigo-200"
          >
            <option value="">Select type</option>
            {eventTypes.map((type, index) =>
              <option value={type}>{type}</option>
            )}
          </select>
        </div>
      </div>

      {/* Date & Time */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700">Event Date & Time <span className="text-red-500">*</span></label>
        <input
          type="datetime-local"
          value={eventDateTime}
          onChange={(e) => setEventDateTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Booking Required */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bookingRequired}
            onChange={(e) => setBookingRequired(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            disabled={!paymentAccountActivated}
          />
          <label className={`font-medium ${paymentAccountActivated ? "text-gray-700" : "text-gray-400"}`}>Booking Required</label>
        </div>
        {!paymentAccountActivated ? <span className="text-orange-500 text-sm">Please add a payment account for enabling ticket purchasing feature</span> : <></>}
      </div>

      {/* Seats & Price (conditional) */}
      {bookingRequired && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Seats</label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Price (Rs.)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring focus:ring-indigo-200"
            />
          </div>
        </div>
      )}

      {/* Address */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Google Map placeholder */}
      <div className="space-y-1">
        <label className="font-medium text-gray-700">Location (Pick on Map)</label>
        <div className="w-full h-48 border rounded-lg flex items-center justify-center">
          {googleMapView()}
        </div>
      </div>

      {/* Main Photo */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Main Photo <span className="text-red-500">*</span></label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainPhotoChange}
          className="w-full file:bg-custom-purple file:text-white file:rounded-md file:border-none file:px-2 file:py-1 file:hover:cursor-pointer"
        />
        {isUpdate && existingMainPhoto && !mainPhoto && (
          <div className="relative inline-block">
            <img
              src={existingMainPhoto}
              alt="Main"
              className="h-24 w-24 object-cover rounded-lg border"
            />
            <FaTrash
              className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 cursor-pointer"
              onClick={() => setExistingMainPhoto(null)}
            />
          </div>
        )}
      </div>

      {/* Other Photos */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700">Other Photos</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleOtherPhotosChange}
          className="w-full file:bg-custom-purple file:text-white file:rounded-md file:border-none file:px-2 file:py-1 file:hover:cursor-pointer"
        />
        {isUpdate && existingOtherPhotos.length > 0 && otherPhotos.length === 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {existingOtherPhotos.map((photo, idx) => (
              <div key={idx} className="relative inline-block">
                <img
                  src={photo}
                  alt={`Other ${idx}`}
                  className="h-20 w-20 object-cover rounded-lg border"
                />
                <FaTrash
                  className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 cursor-pointer"
                  onClick={() =>
                    setExistingOtherPhotos(existingOtherPhotos.filter((_, i) => i !== idx))
                  }
                />
              </div>
            ))}
          </div>
        )}
        <div><span className="italic text-sm w-full text-gray-600">Photos can only be changed after adding. Cannot be removed</span></div>
        <div>
          <span className="text-red-700">{error}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          type="button"
          className="text-sm px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          onClick={() => onCancel()}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${isSubmitting ? "bg-custom-purple-lock" : "bg-custom-purple"} hover:bg-custom-purple-lock text-white px-5 py-2 rounded-lg text-sm`}
        >
          {isSubmitting ? "Saving..." : isUpdate ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;