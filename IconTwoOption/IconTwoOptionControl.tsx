import * as React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import {useConst } from "@uifabric/react-hooks";
import { IIconProps, initializeIcons, mergeStyles, FontIcon,Stack,TextField, ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";




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
    const [selectedValue, setSelectedValue] = useState<boolean>(props.selected);
    const [lefticonprops, setLeftIconProps] = useState<IIconProps>({iconName:props.lefticon});
    const [righticonprops, setRightIconProps] = useState<IIconProps>({iconName:props.righticon});

    //-Initialization : will happen only once = like a contructor
    useConst(() => {
        initializeIcons();
    });

    //LAYOUTEFFECT HOOKS - before render
    useLayoutEffect(() => {

        //ADJUST ICONPROPS when selected value changes
        let lefticonprops:IIconProps = {iconName:props.lefticon};
        if(selectedValue===false)
        {
            lefticonprops.style = {color:props.leftselectedcolor}
        }
        setLeftIconProps(lefticonprops);

        let righticonprops:IIconProps = {iconName:props.righticon};
        if(selectedValue===true)
        {
            righticonprops.style = {color:props.rightselectedcolor}
        }
        setRightIconProps(righticonprops);
        
    }, [selectedValue]);

    //EFFECT HOOKS - after render
    useEffect(() => {

        //SIGNAL BACK TO PCF
        if(props.selected !== selectedValue)
        {
            props.onChange(selectedValue);
        }

    }, [selectedValue]);

    //EVENT HANDLER
    const onChange = (ev?: React.SyntheticEvent<HTMLElement>, option?: IChoiceGroupOption) => {
        if(option !== undefined)
        {            
            setSelectedValue(option.key === "right");
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

                selectedKey={selectedValue ? "right" : "left"}
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



