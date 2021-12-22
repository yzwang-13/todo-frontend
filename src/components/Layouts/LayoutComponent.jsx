import FooterComponent from "./FooterComponent";
import { Header } from "./HeaderComponent";

const LayoutComponent = (props) => {
	return (
		<div>
			<Header />
			{props.children}
			<FooterComponent />
		</div>
	);
};

export default LayoutComponent;
