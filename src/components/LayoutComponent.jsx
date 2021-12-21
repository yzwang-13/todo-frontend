import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";

const LayoutComponent = (props) => {
	return (
		<div>
			<HeaderComponent />
			{props.children}
			<FooterComponent />
		</div>
	);
};

export default LayoutComponent;
