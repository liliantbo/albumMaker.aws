import LogoEspol from './espol.ico'

export default function AlbumFooter() {
    return (
        <footer className="bg-primary" style={{ height: '7vh' }}>
            <nav className="nav bg-primary flex flex-row align-items-center">
                <div className="icon-container mx-1 my-1 ">
                    <img src={LogoEspol} alt="Icono" style={{ width: '24px', height: '24px' }} />
                </div>
                <a className="nav-link "
                    href="http://bootcamps.espol.edu.ec/"
                    target='new-tab'>
                    <small className="text-light">BootCamps 2023</small>
                </a>
            </nav>
        </footer>
    )
}