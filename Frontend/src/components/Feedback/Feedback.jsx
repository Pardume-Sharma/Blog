// import React from 'react'
import React, { useState } from 'react';
import './Feedback.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form redirection
    setIsSubmitting(true);

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Feedback submitted successfully!');
        form.reset(); // Reset the form after submission
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="feedback" id="feedback">
        <form onSubmit={handleSubmit}>
          <h3>Feedback Form</h3>
          <input
            type="hidden"
            name="access_key"
            value="ac691ca3-9abd-45a3-a2a5-1c39bfe387f2"
          />

          <input
            type="text"
            name="name"
            className="form-box"
            placeholder="Enter your Name"
            required
          />
          <input
            type="email"
            name="email"
            className="form-box"
            placeholder="Enter your email"
            required
          />
          <textarea
            name="message"
            className="form-box"
            placeholder="Give your Feedback "
            required
          ></textarea>
          <button
            type="submit"
            className="btn-class"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Feedback;
  