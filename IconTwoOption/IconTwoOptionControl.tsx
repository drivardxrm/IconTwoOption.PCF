import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { initializeIcons, IconNames } from '@uifabric/icons';


export interface IProps {
    selected: boolean;
    onChange: (selected:boolean) => void;
}

export interface IState {
    //selected: boolean;
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
        

            return (
                
                <ChoiceGroup
                //label="Choose"
                selectedKey={this.state.selectedvalue}
                
                options={[
                    {
                        key: "left",
                        iconProps: { iconName: "Dislike"},
                        text: "Dislike"
                        
                    },
                    {
                        key: "right",
                        iconProps: { iconName: "Like"},
                        text: "Like"
                    }
                ]}
                onChange={this.onChange}
                />
            );
    }

}

