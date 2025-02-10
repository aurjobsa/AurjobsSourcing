import React, { useState } from 'react';
import { X } from 'lucide-react';
import image from '../../assets/react.svg'
import ExtraCurricularSection from './CandidateDetails/ExtraCurricularSection';
import SkillsSection from './CandidateDetails/SkillsSection';
import PersonalInfoSection from './CandidateDetails/PersonalInfoSection';
import ExperienceSection from './CandidateDetails/ExperienceSection';
import AccomplishmentsSection from './CandidateDetails/AccomplishmentsSection';
import EducationSection from './CandidateDetails/EducationSection';
import SkillsForm from './CandidateForms/SkillsForm';
import AccomplishmentsForm from './CandidateForms/AccomplishmentsForm';
import ExtraCurricularForm from './CandidateForms/ExtraCurricularForm';
import PersonalInfoForm from './CandidateForms/PersonalInfoForm';
import ExperienceForm from './CandidateForms/ExperienceForm';
import EducationForm from './CandidateForms/EducationalForm';


const CandidateDashboard = ({sectionRefs}) => {
    const [userData, setUserData] = useState({
        personalInfo: {
            name: "John Doe",
            email: "john.doe@example.com",
            mobile: "+91 9876543210",
            location: "India",
            profileImage: image
        },
        educationDetails: [{
            educationLevel: 'Bachelor of Technology',
            collegeName: 'SNIST',
            specialisation: 'Computer Science and Engineering (IoT)',
            graduationYear: '2025',
            graduationScore: '8.54 CGPA',
            twelfthDetails: {
                school: 'Gayathri Junior College',
                score: '96.8%'
            },
            tenthDetails: {
                school: 'BMHS',
                score: '9.2 GPA'
            }
        }],
        skills: ['React.js', 'HTML', 'CSS', 'JavaScript', 'GraphQL', 'Socket.IO', 'Database Management'],
        experienceDetails: [{
            companyName: 'Idea Usher',
            designation: 'Frontend Developer Intern',
            startDate: '01/2025',
            endDate: 'MM/YYYY',
            isCurrentRole: true
        }],
        accomplishments: [
            'Won first place in college hackathon',
            'Published research paper on IoT'
        ],
        extraCurricular: ['Basketball', 'Piano']
    });

    const [editingSection, setEditingSection] = useState(null);
    const [editData, setEditData] = useState(null);

    const Modal = ({ children, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Edit {editingSection}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );

    const handleEdit = (section) => {
        setEditingSection(section);
    };

    const handleSave = (section, newData, index = null) => {
        setUserData(prev => {
            if (Array.isArray(prev[section]) && index !== null) {
                const updatedArray = [...prev[section]];
                updatedArray[index] = newData;
                return {
                    ...prev,
                    [section]: updatedArray
                };
            } else {
                return {
                    ...prev,
                    [section]: newData
                };
            }
        });
        setEditingSection(null);
        setEditData(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Candidate Dashboard</h1>

            <div className="space-y-8">

                <div ref={sectionRefs.profile}>
                    <PersonalInfoSection personalInfo={userData.personalInfo} onEdit={handleEdit} />
                </div>
                <div ref={sectionRefs.education}>
                    <EducationSection educationDetails={userData.educationDetails} onEdit={handleEdit} />
                </div>
                <div ref={sectionRefs.skills}>
                    <SkillsSection skills={userData.skills} onEdit={handleEdit} />
                </div>
                <div ref={sectionRefs.experience}>
                    <ExperienceSection experienceDetails={userData.experienceDetails} onEdit={handleEdit} />
                </div>
                <div ref={sectionRefs.accomplishments}>
                    <AccomplishmentsSection accomplishments={userData.accomplishments} onEdit={handleEdit} />
                </div>
                <div ref={sectionRefs.extraCurricular}>
                    <ExtraCurricularSection extraCurricular={userData.extraCurricular} onEdit={handleEdit} />
                </div>
            </div>

            {/* Edit Modal */}
            {editingSection && (
                <Modal onClose={() => setEditingSection(null)}>
                    {editingSection === 'Personal Information' && <PersonalInfoForm personalInfo={userData.personalInfo} onEdit={handleSave} />}
                    {editingSection === 'Education' && <EducationForm educationDetails={userData.educationDetails} onEdit={handleSave} />}
                    {editingSection === 'Skills' && <SkillsForm skills={userData.skills} onEdit={handleSave} />}
                    {editingSection === 'Experience' && <ExperienceForm experienceDetails={userData.experienceDetails} onEdit={handleSave} />}
                    {editingSection === 'Accomplishments' && <AccomplishmentsForm accomplishments={userData.accomplishments} onEdit={handleSave} />}
                    {editingSection === 'Extra Curricular' && <ExtraCurricularForm extraCurricular={userData.extraCurricular} onEdit={handleSave} />}
                </Modal>
            )}
        </div>
    );
};

export default CandidateDashboard;