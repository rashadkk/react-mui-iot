import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import RoutePath from '../../routes/route';
import Styles from './sidebar.module.scss';

interface RegistrySideBarProps {
	region: string | undefined | null,
	registry: string | undefined 
}

const Sidebar = (props: RegistrySideBarProps) => {

	const { registry, region } = props

	const navigate = useNavigate();

	return (
		<aside id={Styles.AppSidebar} className="d-flex flex-column flex-shrink-0 bg-light">
			<Link  className="px-3 text-center py-3 d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none" 
				to={'/'+RoutePath.registries}>
				<span className="fs-4">IoT Core</span>
			</Link>
			<hr className='m-0' />
			{/* <ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<NavLink
						to={RoutePath.registries}
						className={({ isActive })=> isActive ? 'nav-link active': 'nav-link'}
					>
						<svg className="bi me-2" width="16" height="16"><use xlink:href="#home" /></svg>
						Registries
					</NavLink>
				</li>
			</ul> */}
			<nav aria-label="main mailbox folders">
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/'+RoutePath.registries)}>
							<ListItemText primary="Registries" />
						</ListItemButton>
						{/* <ListItemText>

							<NavLink
								to={'/'+RoutePath.registries}
								className={({ isActive })=> isActive ? 'nav-link active': 'nav-link'}
							>
							Registries
						</NavLink>
						</ListItemText> */}
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate(`/registries/${registry}/${RoutePath.devices}?region=${region}`)}>
							<ListItemText primary="Devices" />
						</ListItemButton>
						{/* <NavLink
								to={'/registries/test1/'+RoutePath.devices}
								className={({ isActive })=> isActive ? 'nav-link active': 'nav-link'}
							>
							Devices
						</NavLink> */}
					</ListItem>
				</List>
			</nav>
		</aside>
	)
}

export default Sidebar;
