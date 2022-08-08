import { List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

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
		<aside id={Styles.AppSidebar} className="d-flex flex-column flex-shrink-0">
			<Toolbar sx={{ borderBottom: '1px solid #cdcdcd' }}>
				<Link 
					className="link-dark text-decoration-none" 
					to={'/'+RoutePath.registries}>
					<span className="fs-4">IoT Core</span>
				</Link>
			</Toolbar>
			<hr className='m-0' />
			<nav aria-label="main mailbox folders">
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate(`/registries/${registry}/overview?region=${region}`)}>
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
