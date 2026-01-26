type WorkspaceProps = {
    children: React.ReactNode
    centered?: boolean
}

export default function Workspace({ children, centered = false }: WorkspaceProps) {
    return (
        <div className={`${centered ? "lg:max-w-[calc(100%-560px)] mx-auto" : "lg:ml-[280px]"}`}>
            {children}
        </div>
    );
}