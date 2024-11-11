// src/pages/BirthCertificateDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import jsPDF from 'jspdf';

const BirthCertificateDetail = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const checkIsStaff = async () => {
      try {
        const response = await api.get('/auth/check-is-staff/');
        setIsStaff(response.data.is_staff);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    checkIsStaff();
  }, []);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const response = await api.get(`/api/vital-events/birth-certificate/${id}/`);
        setApplication(response.data);
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };
    fetchApplicationDetails();
  }, [id]);


  const handleDeleteApplication = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const response = await api.delete(`/api/vital-events/birth-certificate/${id}/`);
        if (response.status === 204) {
          alert("Application deleted successfully.");
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Failed to delete the application.");
      }
    }
  };

  const handlePrintCertificate = () => {
    const doc = new jsPDF();
  
    // Blue banner at the top
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
  
    // Certificate Registration Number (top right, below the banner)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`Certificate Registration Number: ${application.application_number}`, doc.internal.pageSize.width - 60, 40, { align: 'right' });
  
    // Certificate Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text("Federal Democratic Republic of Ethiopia", doc.internal.pageSize.width / 2, 60, { align: 'center' });
    doc.text("Vital Event Registration", doc.internal.pageSize.width / 2, 70, { align: 'center' });
    doc.setFontSize(18);
    doc.text("Birth Certificate", doc.internal.pageSize.width / 2, 85, { align: 'center' });
  
    // Child's Full Name (centered, underlined)
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(`${application.first_name} ${application.middle_name} ${application.last_name}`, doc.internal.pageSize.width / 2, 100, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(doc.internal.pageSize.width / 4, 102, (3 * doc.internal.pageSize.width) / 4, 102); // Underline
  
    // Divider line
    // doc.setLineWidth(0.5);
    // doc.line(20, 110, doc.internal.pageSize.width - 20, 110);
  
    // Details Section
    doc.setFontSize(11);
    let yPosition = 120;
  
    const details = [
      { title: "Date of Birth", value: application.dob },
      { title: "Country of Birth", value: application.country_of_birth },
      { title: "Region of Birth", value: application.region_of_birth },
      { title: "Place of Birth", value: application.place_of_birth },
      { title: "Gender", value: application.gender },
      { title: "Father's Full Name", value: application.father_fullname },
      { title: "Father's Nationality", value: application.father_nationality },
      { title: "Mother's Full Name", value: application.mother_fullname },
      { title: "Mother's Nationality", value: application.mother_nationality },
      { title: "Nationality", value: application.nationality },
      { title: "Application Date", value: application.date_created.split('T')[0] },
      { title: "Applicant Email", value: application.applicant_email_address },
      { title: "Phone Number", value: application.phone_number },
      { title: "Status", value: application.status }
    ];
  
    // Two-column layout, ensuring key and value are on the same line
    details.forEach((detail, index) => {
      const xPosition = index % 2 === 0 ? 20 : doc.internal.pageSize.width / 2 + 10;
      if (index % 2 !== 0) yPosition += 10; // Move down only when starting new row
  
      // Draw key and value on the same line
      doc.setFont('helvetica', 'bold');
      doc.text(`${detail.title}:`, xPosition, yPosition);
  
      // Adjust xPosition for value to appear right after the title, and use italics
      const textWidth = doc.getTextWidth(`${detail.title}: `);
      doc.setFont('helvetica', 'italic');
      doc.text(detail.value, xPosition + textWidth + 2, yPosition);
    });
  
    // Footer
    yPosition += 20;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text("This certificate is created under the eKebele platform.", doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
    doc.text("© 2024 eKebele. All rights reserved.", doc.internal.pageSize.width / 2, yPosition + 10, { align: 'center' });
  
    doc.save(`${application.first_name}_birth_certificate.pdf`);
  };
  
  

  const handleSendComment = async () => {
    try {
      await api.patch(`/api/vital-events/birth-certificate/${id}/`, { comment });
      setApplication((prev) => ({ ...prev, comment }));
      alert('Comment sent successfully');
    } catch (error) {
      console.error('Failed to send comment:', error);
      alert('Failed to send the comment.');
    }
  };

  const updateStatus = async (status) => {
    setLoading(true);
    try {
      await api.patch(`/api/vital-events/birth-certificate/${id}/`, { status });
      setApplication((prev) => ({ ...prev, status }));
      alert(`Application ${status} successfully.`);
    } catch (error) {
      console.error(`Failed to update status to ${status}:`, error);
      alert(`Failed to update status to ${status}.`);
    } finally {
      setLoading(false);
    }
  };

  if (!application) return <p>Loading...</p>;

  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center p-6">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-2xl w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-lg mb-4"></div>
          <h2 className="text-2xl font-bold">{application.application_number}</h2>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
          <div className="col-span-2 font-semibold">Application Date: {application.date_created.split('T')[0]}</div>
          <div className="col-span-2 flex gap-4">
            <div><strong>Applicant:</strong> {application.applicant_name}</div>
            <div><strong>Nationality:</strong> {application.nationality}</div>
          </div>
          <div className="col-span-2">
            <strong>Child's Full Name:</strong> {application.first_name} {application.middle_name} {application.last_name}
          </div>
          <div><strong>DOB:</strong> {application.dob}</div>
          <div><strong>Gender:</strong> {application.gender}</div>
          <div className="col-span-2"><strong>Place of Birth:</strong> {application.place_of_birth}</div>
          <div><strong>Country:</strong> {application.country_of_birth}</div>
          <div><strong>Region:</strong> {application.region_of_birth}</div>
          <div><strong>Status:</strong> {application.status}</div>
          <div><strong>Father's Name:</strong> {application.father_fullname}</div>
          <div><strong>Father's Nationality:</strong> {application.father_nationality}</div>
          <div><strong>Mother's Name:</strong> {application.mother_fullname}</div>
          <div><strong>Mother's Nationality:</strong> {application.mother_nationality}</div>
          <div><strong>Email:</strong> {application.applicant_email_address}</div>
          <div><strong>Phone:</strong> {application.phone_number}</div>
        </div>

        <div className="border-t pt-4">
          <p className="font-semibold">Comment:</p>
          <pre className="bg-gray-100 p-2 rounded-md">{application.comment || 'No comments available'}</pre>
        </div>

        {isStaff ? (
          <div className="mt-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 border rounded-lg mb-4 resize-none"
              rows="4"
              placeholder="Enter your comment here..."
            />
            <button
              onClick={handleSendComment}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-4"
            >
              Send Comment
            </button>
            <div className="flex justify-between">
              <button onClick={() => updateStatus('rejected')} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-32" disabled={loading}>
                {loading && <span className="loader mr-2"></span>}Deny
              </button>
              <button onClick={() => updateStatus('approved')} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-32" disabled={loading}>
                {loading && <span className="loader mr-2"></span>}Approve
              </button>
            </div>
          </div>
        ) : (
          <>
            <button onClick={handleDeleteApplication} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-4">
              Delete Application
            </button>
            {application.status === 'approved' && (
              <button onClick={handlePrintCertificate} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full">
                Print Certificate
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BirthCertificateDetail;
