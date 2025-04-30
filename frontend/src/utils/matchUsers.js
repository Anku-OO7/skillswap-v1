export function matchUsersBySkills(currentUser, allUsers) {
    if (!currentUser || !currentUser.skills || currentUser.skills.length === 0) return [];

    const currentSkills = new Set(currentUser.skills.map(skill => skill.toLowerCase()));

    const matchedUsers = allUsers
        .filter(user => user.uid !== currentUser.uid)
        .map(user => {
            const otherSkills = new Set((user.skills || []).map(skill => skill.toLowerCase()));
            const commonSkills = [...currentSkills].filter(skill => otherSkills.has(skill));
            return { ...user, commonSkills, matchCount: commonSkills.length };
        })
        .filter(user => user.matchCount > 0)
        .sort((a,b) => b.matchCount - a.matchCount);

    return matchedUsers;
}