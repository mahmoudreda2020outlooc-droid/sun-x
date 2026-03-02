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
    {
        id: "02",
        name: "Mahmoud Reda Abdelaziz",
        nameAr: "محمود رضا عبد العزيز ابراهيم على",
        role: "Core Scientist",
        roleAr: "عالِم أساسي",
        studentId: "2421132"
    },
    {
        id: "03",
        name: "Mohamed Mohamed Aguel",
        nameAr: "محمد محمد ابراهيم عقل",
        role: "Core Scientist",
        roleAr: "عالِم أساسي",
        studentId: "2421088"
    },
    {
        id: "04",
        name: "Mohamed Abou Al-Ela",
        nameAr: "محمد أبوالعلا محمد احمد",
        role: "Core Scientist",
        roleAr: "عالِم أساسي",
        studentId: "2420986"
    },
    // Placeholders for the rest of the 33 members
    ...Array.from({ length: 29 }).map((_, i) => ({
        id: String(i + 5).padStart(2, '0'),
        name: "TECHNO MEMBER",
        nameAr: "عضو تكنو",
        role: "Core Scientist",
        roleAr: "عالِم أساسي",
        studentId: "0000000"
    }))
];
