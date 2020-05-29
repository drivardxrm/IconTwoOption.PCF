
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IconTwoOptionControl, {IProps } from "./IconTwoOptionControl";

export class IconTwoOption implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _selected: boolean;
	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private _props: IProps = { selected: false, 
								lefticon:"",
								righticon:"",
								lefttext:"",
								righttext:"",
								leftselectedcolor:"",
								rightselectedcolor:"", 
								readonly:false,
								masked:false,
								onChange : this.notifyChange.bind(this) };
	
	
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{

		// Add control initialization codeà
		this._notifyOutputChanged = notifyOutputChanged;
		this._container = document.createElement("div");

		container.appendChild(this._container);
	}

	notifyChange(selected: boolean) {
		
		this._selected = selected;
		this._notifyOutputChanged();
	}



	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{

		// If the bound attribute is disabled because it is inactive or the user doesn't have access
		let isReadOnly = context.mode.isControlDisabled;

		let isMasked = false;
		// When a field has FLS enabled, the security property on the attribute parameter is set
		if (context.parameters.twooption.security) {
			isReadOnly = isReadOnly || !context.parameters.twooption.security.editable;
			
			isMasked = !context.parameters.twooption.security.readable
		}

		//LEFT  TEXT
		let options:ComponentFramework.PropertyHelper.FieldPropertyMetadata.TwoOptionMetadata | undefined
				= context.parameters.twooption.attributes;
		let lefttext = context.parameters.lefttext.raw || undefined;
		if(lefttext == undefined)
		{
			lefttext = options?.Options[0].Label;
		}

		//RIGHT TEXT
		let righttext = context.parameters.righttext.raw || undefined;
		if(righttext == undefined)
		{
			righttext = options?.Options[1].Label;
		}

		// Add code to update control view
		this._selected = context.parameters.twooption.raw; 
		
		this._props.selected = this._selected;
		this._props.lefticon = context.parameters.lefticon.raw || "";
		this._props.righticon = context.parameters.righticon.raw || "";
		this._props.lefttext = lefttext || "";
		this._props.righttext = righttext || "";
		this._props.leftselectedcolor = context.parameters.leftselectedcolor.raw || "";
		this._props.rightselectedcolor = context.parameters.rightselectedcolor.raw || "";
		this._props.readonly = isReadOnly;
		this._props.masked = isMasked;

		ReactDOM.render(
			React.createElement(IconTwoOptionControl, this._props)
			, this._container
		);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			twooption : this._selected
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		ReactDOM.unmountComponentAtNode(this._container);
	}
}