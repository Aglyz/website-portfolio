function HeaderActions({ back=true, git=null, exe=null }) {
    return (
        <section className="sticky-top header-action bg-white">
            <section className="content-sm d-flex flex-column gap-3 py-3">
                <div className="d-flex align-items-start gap-4">
                    {back ?
                    <a href="#" className="btn btn-hover-main lexend shadow">
                        <i className="bi bi-arrow-left me-2"></i>
                        Retour à la liste
                    </a> : null}
                </div>
                <div className="d-flex align-items-start gap-4">
                    {git ?
                    <a href={git} className="btn btn-hover-main lexend shadow">
                        <i className="bi bi-github me-2"></i>
                        Code source
                    </a> : null}

                    {exe ?
                    <a href={asset_url + exe} className="btn btn-hover-main lexend shadow ms-auto">
                        <i className="bi bi-filetype-exe me-2"></i>
                        Exécutable
                    </a> : null}
                </div>
            </section>
            <section className="content-md d-flex align-items-start gap-4 py-3">
                {back ?
                <a href="#" className="btn btn-hover-main lexend shadow">
                    <i className="bi bi-arrow-left me-2"></i>
                    Retour à la liste
                </a> : null}
                
                {git ?
                <a href={git} className="btn btn-hover-main lexend shadow">
                    <i className="bi bi-github me-2"></i>
                    Code source
                </a> : null}
                
                {exe ?
                <a href={asset_url + exe} className="btn btn-hover-main lexend shadow ms-auto">
                    <i className="bi bi-filetype-exe me-2"></i>
                    Exécutable
                </a> : null}
            </section>
        </section>
    );
}

// Global expose
window.HeaderActions = HeaderActions;