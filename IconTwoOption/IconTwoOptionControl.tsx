import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Stack,TextField} from "office-ui-fabric-react/lib/index"; 
import { FontIcon} from "office-ui-fabric-react/lib/Icon";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { initializeIcons} from '@uifabric/icons';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { useState, useEffect } from "react";


export interface IProps {
    selected: boolean;
    lefticon: string;
    righticon: string;
    lefttext: string;
    righttext:string;
    leftselectedcolor:string;
    rightselectedcolor:string;
    readonly: boolean;
    masked: boolean;
    onChange: (selected:boolean) => void;
}


const IconTwoOptionControl = (props : IProps): JSX.Element => {

     //STATE VARIABLES
    const [selectedValue, setSelectedValue] = useState<"left" | "right">(props.selected == true ? "right" : "left");
    const [lefticonprops, setLeftIconProps] = useState<IIconProps | undefined>(undefined);
    const [righticonprops, setRightIconProps] = useState<IIconProps | undefined>(undefined);


    //EFFECT HOOKS
    //-Initialization : will happen only once = like a contructor
    useEffect(() => {
        initializeIcons();
        setLeftIconProps({iconName:props.lefticon});
        setRightIconProps({iconName:props.righticon});
    }, []); 

    useEffect(() => {

        let lefticonprops:IIconProps = {iconName:props.lefticon};
        if(selectedValue=="left")
        {
            lefticonprops.style = {color:props.leftselectedcolor}
        }
        setLeftIconProps(lefticonprops);

        let righticonprops:IIconProps = {iconName:props.righticon};
        if(selectedValue=="right")
        {
            righticonprops.style = {color:props.rightselectedcolor}
        }
        setRightIconProps(righticonprops);
        
        let selectedValueBool = selectedValue == "right";
        
        if(props.selected != selectedValueBool)
        {
            props.onChange(selectedValueBool);
        }
    }, [selectedValue]);

    const onChange = (ev?: React.SyntheticEvent<HTMLElement>, option?: IChoiceGroupOption) => {
        if(option != undefined)
        {            
            let selected : "left" | "right" = option.key == "right" ? "right" : "left"; 
            setSelectedValue(selected)
        }
        
    }

    //STYLES
    const maskedclass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 50,
        margin: "1px",      
    });

    //RENDERING
    if(props.masked){
        return(
            <Stack tokens={{ childrenGap: 2 }} horizontal>
                <FontIcon iconName="Lock" className={maskedclass} />     
                <TextField value="*********" style={{width:"100%"}}/>
            </Stack>
        )
    }else{
        return (
            
            <ChoiceGroup
            //label="Choose"
            selectedKey={selectedValue}
            options={[
                {
                    key: "left",
                    iconProps: lefticonprops,
                    text: props.lefttext,
                    disabled: props.readonly
                },
                {
                    key: "right",
                    iconProps: righticonprops,
                    text: props.righttext,
                    disabled: props.readonly
                }
            ]}
            onChange={onChange}
            />
        );
    }        
}
export default IconTwoOptionControl;



