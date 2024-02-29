import React, { useState } from 'react'
import './Main.css';
import { Button, Checkbox, ConfigProvider, GetProp, Input, Radio, Switch } from 'antd';
import FloatLabel from '../floatLabel/FloatLabel';

const q1_options = [
    {label: "No", value: false},
    {label: "Yes", value: true},
]

const q2_options = [
    {label: "Redus", value: "0"},
    {label: "Lodash", value: "1"},
    {label: "Ant design", value: "2"},
    {label: "Webpack", value: "3"},
    {label: "Other", value: "4"},
]

const Main = () => {

    const [data, setData] = useState({
        firstName: "",
        isProficient: false,
        toolsUsed: "0,2,3,4",
    });
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const processQuestion = () => {
        console.log(data)
    }

    const onCheckBoxChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        setData({...data, toolsUsed: checkedValues.join(',')})
    };

    
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#6B47ED",
                    colorWhite: "#fff",
                    colorBorder: isEditable ? "#6B47ED" : "#d9d9d9",
                },
                components: {
                    Input: {
                        activeBorderColor: "#6B47ED",
                        hoverBorderColor: "#6B47ED",
                    },
                    Switch: {
                        handleBg: isEditable ? "white" : "#6B47ED",
                    },
                    Radio: {
                        dotSize: 0,
                    },
                }
            }}
        >
            <div id='main'>
                <div className='container'>
                    <div className='switch-container'>
                        <div className='switch-label'>Editable</div>
                        <Switch defaultChecked value={isEditable} onChange={setIsEditable} />
                    </div>
                    <FloatLabel label="First Name" name="firstName" value={data.firstName} disabled={!isEditable}>
                        <Input disabled={!isEditable} className='inputBar' value={data.firstName} onChange={(e) => setData({...data, firstName: e.target.value})} />
                    </FloatLabel>
                    <div className='question-container'>
                        <div className='question'>Are you proficient in ReactJS development?</div>
                        <Radio.Group className='radio-group' disabled={!isEditable} value={data.isProficient} onChange={(e) => setData({ ...data, isProficient: e.target.value })} options={q1_options}/>
                    </div>
                    <div className='question-container'>
                        <div className='question-group'>
                            <div className='question'>Which tools do you use?</div>
                            <div className='des'>Please select all that apply.</div>
                        </div>
                        <Checkbox.Group disabled={!isEditable} className='checkbox-group' options={q2_options} value={data.toolsUsed.split(",")} onChange={onCheckBoxChange} />
                    </div>
                </div>
                <Button className='process-button' disabled={!isEditable} onClick={processQuestion}>Process</Button>
            </div>
        </ConfigProvider>
    )
}

export default Main