import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // Used to show success or error messages

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }

    // Send form data to your backend (we'll set this up next)
    try {
      const response = await fetch('http://localhost:8000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1a1a1a]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-[#1a1a1a] border-[#D4AF37] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1a1a1a]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-[#1a1a1a] border-[#D4AF37] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1a1a1a]">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 text-[#1a1a1a] border-[#D4AF37] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1a1a1a]">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 text-[#1a1a1a] border-[#D4AF37] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            required
          ></textarea>
        </div>

        <button type="submit" className="w-full text-white hover:text-[#D4AF37] py-2 rounded-md">
          Send Message
        </button>
      </form>

      {status && <p className="mt-4 text-center text-sm text-[#1a1a1a]">{status}</p>}
    </div>
  );
};

export default ContactForm;
