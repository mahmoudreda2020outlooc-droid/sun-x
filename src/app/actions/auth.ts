'use server';

export async function verifyDashboardPassword(passcode: string): Promise<boolean> {
    // In a real production app, this would check against a hashed value
    // or a database. For this graduation project, we use an environment variable.
    const correctPassword = process.env.DASHBOARD_PASSWORD || '8208';

    // Simulate a small network delay to make it feel like a "backend" check
    await new Promise(resolve => setTimeout(resolve, 500));

    return passcode === correctPassword;
}
