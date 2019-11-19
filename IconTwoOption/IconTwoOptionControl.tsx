import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { initializeIcons, IconNames } from '@uifabric/icons';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';


export interface IProps {
    selected: boolean;
    lefticon: string;
    righticon: string;
    lefttext: string;
    righttext:string;
    leftselectedcolor:string;
    rightselectedcolor:string;
    onChange: (selected:boolean) => void;
}

export interface IState {
    selectedvalue: "left" | "right";
}


export class IconTwoOptionControl extends React.Component<IProps,IState> {

    constructor(props: Readonly<IProps>) {

        initializeIcons();
        super(props);
        this.state = { selectedvalue: this.getSelectedValue(this.props.selected)};
        this.onChange = this.onChange.bind(this);

    }

    componentWillReceiveProps(props: IProps) {

        this.setState({selectedvalue : this.getSelectedValue(props.selected)});

    }

    getSelectedValue(selected:boolean){
        return selected == true ? "right": "left"
    }

    getLeftRight(selectedvalue:string){
        return selectedvalue == "right" ? "right" : "left";
    }

    getSelected(selectedvalue:string){
         return selectedvalue == "right";
    }

    onChange(ev?: React.SyntheticEvent<HTMLElement>, option?: IChoiceGroupOption) {
        if(option != undefined)
        {
            
            let selected = this.getSelected(option.key)

            this.setState({selectedvalue: this.getLeftRight(option.key)},)
            this.props.onChange(selected);
            
        }
        
    }

    render() {
        
            var lefticonprops:IIconProps = {iconName:this.props.lefticon}
            if(this.state.selectedvalue=="left")
            {
                lefticonprops.style = {color:this.props.leftselectedcolor}
            }

            var righticonprops:IIconProps = {iconName:this.props.righticon}
            if(this.state.selectedvalue=="right")
            {
                righticonprops.style = {color:this.props.rightselectedcolor}
            }
            return (
                
                <ChoiceGroup
                //label="Choose"
                selectedKey={this.state.selectedvalue}
                
                options={[
                    {
                        key: "left",
                        iconProps: lefticonprops,
                        text: this.props.lefttext
                        
                    },
                    {
                        key: "right",
                        iconProps: righticonprops,
                        text: this.props.righttext
                    }
                ]}
                onChange={this.onChange}
                />
            );
    }

}

