import React, { useState } from "react";
import "../../styles/Profile.css";

const SkillSelector = ({ selectedSkills, setSelectedSkills, onSkillsChange }) => {
    const allSkills = [
        "JavaScript", "Python", "React", "Node.js", "Django", "PostgreSQL",
        "Machine Learning", "Cybersecurity", "AWS", "Docker", "Kubernets"
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    
    const handleSkillSelect = (skill) => {
        const formattedSkill = skill.trim().toLowerCase();
        const capitalizedSkill = formattedSkill.charAt(0).toUpperCase() + formattedSkill.slice(1);
        if (!selectedSkills.includes(capitalizedSkill)) {
            const updatedSkills = [...selectedSkills, capitalizedSkill];            
            setSelectedSkills(updatedSkills);  // Send to parent component
            onSkillsChange(updatedSkills);
            setInputValue("");
        }
    };
    const handleAddSkill = () => {
        const formattedSkill = inputValue.trim().toLowerCase();
        const capitalizedSkill = formattedSkill.charAt(0).toUpperCase() + formattedSkill.slice(1);
        if (capitalizedSkill && !selectedSkills.includes(capitalizedSkill)) {
            const updatedSkills = [...selectedSkills, capitalizedSkill];
            setSelectedSkills(updatedSkills);
            onSkillsChange(updatedSkills);
            setInputValue("");
        }
    };
    const handleSkillRemove = (skill) => {
        const updatedSkills = selectedSkills.filter(s => s !== skill);
        setSelectedSkills(updatedSkills); 
        onSkillsChange(updatedSkills);       
    };
    // const handleSkillChange = (event) => { 
    //     const skill = event.target.value;

    //     if (skill && !selectedSkills.includes(skill)) {
    //         const updatedSkills = [...selectedSkills, skill];
    //         setSelectedSkills(updatedSkills);
    //         onSkillsChange(updatedSkills);
    //     }
    // };


    return (
        <div className="skills-container">
            <div>
                <input 
                    type="text"
                    placeholder="Add a skill..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <button onClick={handleAddSkill}>Add</button>
                <div className="selected-skills">
                    {selectedSkills.map((skill) => (
                        <span key={skill} className="skill-tag">
                            {skill} <button onClick={() => handleSkillRemove(skill)}>x</button>
                        </span>
                    ))}
                </div>
            </div>
            <input 
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-box"
            />
            <div className="dropdown">
                {allSkills
                    .filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(skill => (
                        <div key={skill} className="dropdown-item" onClick={() => handleSkillSelect(skill)}>
                            {skill}
                        </div>
                    ))}
            </div>
            {/* <div className="selected-skills">
                {selectedSkills.map(skill => (
                    <span key={skill} className="skill-tag">
                        {skill} <button onClick={() => handleSkillRemove(skill)}>x</button>
                    </span>
                ))}
            </div> */}
        </div>
        
    );
};

export default SkillSelector;