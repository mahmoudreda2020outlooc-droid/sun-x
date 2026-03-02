export interface TeamMember {
    id: string;
    name: string;
    nameAr: string;
    role: string;
    roleAr: string;
    studentId: string;
}

export const teamMembers: TeamMember[] = [
    {
        id: "01",
        name: "Malak Mohamed Mahmoud",
        nameAr: "ملك محمد محمود مهلل عبد الصادق",
        role: "Team Leader",
        roleAr: "قائد الفريق",
        studentId: "2421235"
    },
    // Placeholders for the rest of the 33 members
    ...Array.from({ length: 32 }).map((_, i) => ({
        id: String(i + 2).padStart(2, '0'),
        name: "TECHNO MEMBER",
        nameAr: "عضو تكنو",
        role: "Core Scientist",
        roleAr: "عالِم أساسي",
        studentId: "0000000"
    }))
];
