export default async function AuthLayout({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> {
    return (
        <>
            {children}
        </>
    );
}